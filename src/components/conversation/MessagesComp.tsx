import { ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { MessageComp } from '@/components/conversation/MessageComp'
import { ID, MessageStatusType } from '@/ds/general'
import { FetchBaseQueryError, skipToken } from '@reduxjs/toolkit/query'
import { useLazyUser } from '@/hooks/use-user'
import { IMessage, IMessageParams, MessageType } from '@/ds/openai/message'
import { PlatformType } from '@/ds/openai/general'
import { injectOpenAIConversation } from '@/states/api/conversationApi'
import { injectOpenAIMessages } from '@/states/api/messageApi'
import { ICreateConversation } from '@/ds/openai/conversation'
import { CentralLoadingComp } from '@/components/general/CentralLoadingComp'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { NEXT_PUBLIC_BACKEND_ENDPOINT } from '@/lib/env'
import { useU } from '@/hooks/use-u'
import { useToast } from '@/hooks/use-toast'
import { initMessageParams } from '@/lib/utils'
import { ChatgptModelType, ChatgptRoleType } from '@/ds/openai/chatgpt'
import { CHATGPT_ROLE_PROMPT_DEFAULT } from '@/settings'
import { SendInput } from '@/components/chatgpt/send-input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export const MessagesComp = <T extends PlatformType>(
	{
		cid,
		platform_type,
		conversationsComp,
	}: {
		cid: ID | null
		platform_type: T
		conversationsComp: ReactNode
	}) => {
	
	const { toast } = useToast()
	const { useCreateConversationMutation } = injectOpenAIConversation<T>()
	const { useListMessagesQuery, useSendMessageMutation, useGetConversationParamsQuery } = injectOpenAIMessages<T>()
	
	const [user, getUser] = useLazyUser()
	const user_id = user?.id
	
	
	const u = useU()
	
	const [conversation_id, setConversationId] = useState(cid)
	const [messages, setMessages] = useState<IMessage<T>[]>([])
	const { currentData: initedMessages, isLoading: isFetchingMessages } = useListMessagesQuery(cid ? { conversation_id: cid, platform_type } : skipToken)
	
	const [createConversation] = useCreateConversationMutation()
	
	const { currentData: conversationParams } = useGetConversationParamsQuery(conversation_id ?? skipToken)
	const [messageParams, setMessageParams] = useState<IMessageParams<T>>(initMessageParams<T>(platform_type))
	
	const refMessageSend = useRef<HTMLTextAreaElement | null>(null)
	const refMessageEnd = useRef<HTMLDivElement | null>(null)
	
	const pushMessage = (message: IMessage<T>) => setMessages((messages) => [...messages, message])
	
	const setLastMessage = (func: (msg: IMessage<T>) => IMessage<T>) => {
		setMessages((messages) => {
			const message = messages[messages.length - 1]
			const updated = func(message)
			// console.log('updated: ', updated.content)
			return [...messages.slice(0, messages.length - 1), updated]
		})
	}
	
	const concatMessage = (chunk: string, status: MessageStatusType = 'OK') =>
		setLastMessage((msg) => ({ ...msg, content: msg.content + chunk, status }))
	
	
	const [isLoadingChatgpt, setLoadingChatgpt] = useState(false)
	const [sendDalleMessage, { isLoading: isLoadingDalle, data: dalleMessage, error: dalleError }] = useSendMessageMutation()
	
	
	// update conversation id upon prop changes
	useEffect(() => {
		setConversationId(cid)
		if (!cid) setMessages([])
	}, [cid])
	/**
	 * update messages upon inited messages changed
	 *
	 * 1. cid changed triggered by url change
	 * 2. inited messages changed out of auto fetch messages
	 * 3. set messages
	 */
	useEffect(() => {
		if (initedMessages) setMessages((messages) => initedMessages)
	}, [initedMessages])
	
	useEffect(() => {
		if (dalleMessage) setLastMessage(() => dalleMessage)
	}, [dalleMessage])
	
	useEffect(() => {
		if (dalleError) {
			console.error(dalleError)
			const { status, data } = dalleError as unknown as FetchBaseQueryError as { status: number, data: { detail: string } }
			setLastMessage((msg) => ({ ...msg, content: data.detail, type: MessageType.text, status: status === 402 ? 'ERROR_TOKEN_DRAIN' : 'ERROR' }))
		}
	}, [dalleError])
	
	// auto scroll
	useEffect(() => refMessageEnd.current?.scrollIntoView({
		behavior: 'smooth',
		block: 'nearest', // inner specific div
	}), [messages.length && messages[messages.length - 1].content.length])
	
	const fetchSSE = (msg: IMessage<T>) => {
		console.log(`[fetching SSE] msg: ${msg}`)
		
		class MyError extends Error {}
		
		fetchEventSource(`${NEXT_PUBLIC_BACKEND_ENDPOINT}/chatGPT/chat?stream=true`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(msg),
			onopen: async (response) => {
				console.log('onOpen')
				console.log({ response })
				if (!response.ok) {
					const { status } = response
					const { detail } = await response.json()
					console.log({ status, detail })
					concatMessage(detail, status === 402 ? 'ERROR_TOKEN_DRAIN' : 'ERROR')
					throw new MyError(detail)
				}
			},
			onmessage(msg) {
				const { data: chunk } = msg
				// console.info({ chunk })
				// todo: 为空的时候表示换行（后端是正常的，不知道前端这里为啥会变）
				concatMessage(chunk === '' ? '\n' : chunk, 'OK')
			},
			onclose: () => {
				console.log('onClose')
				if (user) getUser(user.id) // update token
			},
			onerror: (error) => {
				console.log('onError')
				throw error
			},
		})
			.catch(console.error)
			.finally(() => setLoadingChatgpt(false))
	}
	
	
	const onSubmit = async (refInput: RefObject<HTMLTextAreaElement>) => {
		// 直接处理 client 端错误，不要直接pushMessage，否则会导致各种失配问题
		if (!user_id) return toast({ title: '聊天功能需要先登录再使用！', variant: 'destructive' })
		if (isLoadingDalle || isLoadingChatgpt) return toast({ title: '请耐心等待回复完成！', variant: 'destructive' })
		
		if (platform_type === PlatformType.chatGPT) setLoadingChatgpt(true)
		
		const content = refInput.current!.value
		refInput.current!.value = ''
		
		let msg: IMessage<T> = {
			conversation_id: conversation_id || '',
			content,
			type: MessageType.text,
			platform_type,
			platform_params: messageParams,
			sender: user_id,
		}
		await pushMessage(msg)
		
		if (!conversation_id) {
			
			const createConversationModel: ICreateConversation<T> =
				{
					user_id, platform_type, platform_params: {
						model: ChatgptModelType.gpt35,
						system_prompt: conversationParams?.system_prompt || CHATGPT_ROLE_PROMPT_DEFAULT,
					},
				}
			const { id: newConversationID } = await createConversation(createConversationModel).unwrap()
			
			setConversationId(newConversationID)
			msg.conversation_id = newConversationID
		}
		
		await pushMessage({
			...msg,
			sender: 'openai',
			platform_params: { ...msg.platform_params, role: ChatgptRoleType.assistant },
			type: platform_type === PlatformType.dalle ? MessageType.image_url : MessageType.text, // todo: skeleton for image, but error with text
			content: '',
		})
		
		if (platform_type === PlatformType.chatGPT) {
			fetchSSE(msg)
		} else {
			sendDalleMessage(msg)
		}
	}
	
	
	// 这个加了会闪屏
	// 但是不加的话，在网速差的时候就存在点了没反应的问题
	// 但转念一想，除了用于调试，谁会频繁地切换conversation呢？
	// 所以还是加上吧！
	if (isFetchingMessages) return <CentralLoadingComp/>
	
	
	return (
		<div className={'grow items-stretch overflow-hidden flex flex-col'}>
			<div className={'w-full rounded-none mb-1 flex justify-center items-center font-semibold'}>
				{JSON.stringify(conversationParams)}
				{/*Model: {conversationParams.}*/}
			</div>
			
			<div className={'w-full grow overflow-auto flex flex-col'}>
				{/* messages */}
				{messages.map((msg, index) => <MessageComp msg={msg} key={index}/>)}
				
				{/* for scroll */}
				<div ref={refMessageEnd} className={'w-full'}/>
			</div>
			
			<SendInput handleSubmit={onSubmit} extraButtonsOnMobile={(
				<Sheet>
					<SheetTrigger asChild>
						<Button size={'sm'} className={'rounded-none'}>{u.ui.chat.btn.conversations}</Button>
					</SheetTrigger>
					<SheetContent className={'w-1/2 p-0 pt-10'} position={'left'}>
						{conversationsComp}
					</SheetContent>
				</Sheet>
			)}/>
		
		</div>
	)
}
