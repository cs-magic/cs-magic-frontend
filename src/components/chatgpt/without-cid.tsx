import { ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { MessageComp } from '@/components/chatgpt/MessageComp'
import { MessageStatusType, MessageType } from '@/ds/general'
import { skipToken } from '@reduxjs/toolkit/query'
import { CentralLoadingComp } from '@/components/general/CentralLoadingComp'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { NEXT_PUBLIC_BACKEND_ENDPOINT } from '@/lib/env'
import { useU } from '@/hooks/use-u'
import { useToast } from '@/hooks/use-toast'
import { ChatgptModelType, ChatgptRoleType, IChatgptConversationCreate, IChatgptMessage } from '@/ds/openai/chatgpt'
import { CHATGPT_ROLE_PROMPT_DEFAULT } from '@/settings'
import { SendInput } from '@/components/chatgpt/send-input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useCreateConversationMutation, useGetConversationQuery, useListChatgptMessagesQuery } from '@/states/api/chatgptApi'
import { PlatformType } from '@/ds/openai'

export const MessagesWithoutCid = ({ cid, conversationsComp }: { cid: null, conversationsComp: ReactNode }) => {
	const { toast } = useToast()
	
	const user = useU()
	const u = useU()
	
	const [conversation_id, setConversationId] = useState(cid)
	const [messages, setMessages] = useState<IChatgptMessage[]>([])
	const { currentData: initedMessages = [], isLoading: isFetchingMessages } = useListChatgptMessagesQuery(cid ?? skipToken)
	
	const [createConversation] = useCreateConversationMutation()
	
	const { currentData: conversation } = useGetConversationQuery(conversation_id ?? skipToken)
	
	const refMessageEnd = useRef<HTMLDivElement | null>(null)
	
	const pushMessage = (message: IChatgptMessage) => setMessages((messages) => [...messages, message])
	
	const setLastMessage = (func: (msg: IChatgptMessage) => IChatgptMessage) => {
		setMessages((messages) => {
			const message = messages[messages.length - 1]
			const updated = func(message)
			// console.log('updated: ', updated.content)
			return [...messages.slice(0, messages.length - 1), updated]
		})
	}
	
	const concatMessage = (chunk: string, status: MessageStatusType = 'OK') =>
		setLastMessage((msg) => ({ ...msg, content: msg.content + chunk, status }))
	
	
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
		// useEffect(() => {
		// 	if (initedMessages) setMessages((messages) => initedMessages)
		// }, [initedMessages])
		
		
		// todo: better auto scroll
		// useEffect(() => refMessageEnd.current?.scrollIntoView({
		// 	behavior: 'smooth',
		// 	block: 'nearest', // inner specific div
		// }), [messages.length && messages[messages.length - 1].content.length])
	
	const fetchSSE = (msg: IChatgptMessage) => {
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
		}
	
	
	const onSubmit = async (refInput: RefObject<HTMLTextAreaElement>) => {
		// 直接处理 client 端错误，不要直接pushMessage，否则会导致各种失配问题
		if (!user_id) return toast({ title: '聊天功能需要先登录再使用！', variant: 'destructive' })
		
		const content = refInput.current!.value
		refInput.current!.value = ''
		
		let msg: IChatgptMessage = {
			conversation_id: conversation_id || '',
			content,
			type: MessageType.text,
			platform_type: PlatformType.chatGPT,
			platform_params: { role: ChatgptRoleType.user },
			sender: user_id,
			time: new Date(),
		}
		await pushMessage(msg)
		
		if (!conversation_id) {
			
			const createConversationModel: IChatgptConversationCreate =
				{
					user_id, platform_type: PlatformType.chatGPT, platform_params: {
						model: ChatgptModelType.gpt_35,
						system_prompt: conversation?.platform_params.system_prompt || CHATGPT_ROLE_PROMPT_DEFAULT,
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
			type: MessageType.text,
			content: '',
		})
		
		fetchSSE(msg)
	}
	
	
	// 这个加了会闪屏
	// 但是不加的话，在网速差的时候就存在点了没反应的问题
	// 但转念一想，除了用于调试，谁会频繁地切换conversation呢？
	// 所以还是加上吧！
	if (isFetchingMessages) return <CentralLoadingComp/>
	
	
	return (
		<div className={'grow items-stretch overflow-hidden flex flex-col'}>
			<div className={'w-full rounded-none mb-1 flex justify-center items-center font-semibold'}>
				{JSON.stringify(conversation)}
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
