import { clsx } from 'clsx'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { MessageComp } from '@/components/conversation/MessageComp'
import { Textarea } from '@/components/ui/textarea'
import { IconBrandTelegram } from '@tabler/icons-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ID, MessageStatusType } from '@/ds/general'
import { FetchBaseQueryError, skipToken } from '@reduxjs/toolkit/query'
import { useLazyUser } from '@/hooks/use-user'
import { DalleDimensionType, IMessage, IMessageParams, MessageRoleType, MessageType } from '@/ds/openai/message'
import { PlatformType } from '@/ds/openai/general'
import { injectOpenAIConversation } from '@/states/api/conversationApi'
import { injectOpenAIMessages } from '@/states/api/messageApi'
import { ChatgptModelType, IConversationParams, ICreateConversation } from '@/ds/openai/conversation'
import _ from 'lodash'
import { CentralLoadingComp } from '@/components/general/CentralLoadingComp'
import { Button } from '@/components/ui/button'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { BACKEND_ENDPOINT } from '@/lib/env'
import { useU } from '@/hooks/use-u'
import { useToast } from '@/hooks/use-toast'

const c = 'text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex m-auto break-all'

const initConversationParams = <T extends PlatformType>(platform_type: T): IConversationParams<T> => (
	platform_type === PlatformType.chatGPT
		? {
			model: ChatgptModelType.gpt35,
			selected: [],
		} as IConversationParams<PlatformType.chatGPT>
		: {} as IConversationParams<PlatformType.dalle>
) as IConversationParams<T>

const initMessageParams = <T extends PlatformType>(platform_type: T): IMessageParams<T> => (
	platform_type === PlatformType.chatGPT
		? {
			role: MessageRoleType.user,
		} as IMessageParams<PlatformType.chatGPT>
		: {
			role: MessageRoleType.user,
			dimension: DalleDimensionType.sm,
		} as IMessageParams<PlatformType.dalle>
) as IMessageParams<T>


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
	const { useListMessagesQuery, useSendMessageMutation } = injectOpenAIMessages<T>()
	
	const [user, getUser] = useLazyUser()
	const user_id = user?.id
	
	
	const u = useU()
	
	const [conversation_id, setConversationId] = useState(cid)
	const [messages, setMessages] = useState<IMessage<T>[]>([])
	const { currentData: initedMessages, isLoading: isFetchingMessages } = useListMessagesQuery(cid ? { conversation_id: cid, platform_type } : skipToken)
	
	const [createConversation] = useCreateConversationMutation()
	
	const [conversationParams, setConversationParams] = useState<IConversationParams<T>>(initConversationParams<T>(platform_type))
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
	useEffect(() => refMessageEnd.current?.scrollIntoView({ behavior: 'smooth' }), [messages.length && messages[messages.length - 1].content.length])
	
	const fetchSSE = (msg: IMessage<T>) => {
		class MyError extends Error {}
		
		fetchEventSource(`${BACKEND_ENDPOINT}/chatGPT/${msg.conversation_id}/chat?stream=true`, {
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
	
	
	const onSubmit = async () => {
		// 直接处理 client 端错误，不要直接pushMessage，否则会导致各种失配问题
		if (!user_id) return toast({ title: '聊天功能需要先登录再使用！', variant: 'destructive' })
		if (isLoadingDalle || isLoadingChatgpt) return toast({ title: '请耐心等待回复完成！', variant: 'destructive' })
		
		if (platform_type === PlatformType.chatGPT) setLoadingChatgpt(true)
		
		const content = refMessageSend.current!.value
		refMessageSend.current!.value = ''
		
		let msg: IMessage<T> = {
			conversation_id: conversation_id || '',
			content,
			type: MessageType.text,
			platform_type,
			platform_params: messageParams,
			sender: user_id || 'Unknown',
		}
		await pushMessage(msg)
		
		const _createConversation = async () => {
			//// 1.
			// const initCreateConversationModel = (user_id: ID): ICreateConversation<T> => ({
			// 		user_id,
			// 		platform_type,
			// 		platform_params: platform_type === PlatformType.chatGPT ? {
			// 			model: ChatgptModelType.gpt35,
			// 			selected: [],
			// 		} : {}
			// 	} as ICreateConversation<T>)
			// const conversationModel: ICreateConversation<T> = initCreateConversationModel(user_id)
			
			//// 2.
			const createConversationModel: ICreateConversation<T> = { user_id: user_id!, platform_type, platform_params: conversationParams }
			
			//// 3.
			//  failed: Type 'PlatformType.dalle' is not assignable to type 'PlatformType.chatGPT'.
			// let createConversationModel: ICreateConversation<PlatformType.chatGPT> = {
			// 	user_id,
			// 	platform_type: PlatformType.chatGPT,
			// 	platform_params: {
			// 		model: ChatgptModelType.gpt35,
			// 		selected: [],
			// 	},
			// } as unknown as ICreateConversation<T>
			
			return await createConversation(createConversationModel).unwrap()
		}
		
		if (!conversation_id) {
			const newConversationID = await _createConversation()
			setConversationId(newConversationID)
			msg.conversation_id = newConversationID
		}
		
		await pushMessage({
			...msg,
			sender: 'system',
			platform_params: { ...msg.platform_params, role: MessageRoleType.assistant },
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
				<span className={'inline-flex items-center'}>Tokens:
					<p className={clsx('px-2 text-lg font-bold text-primary', !(isLoadingChatgpt || isLoadingDalle) && 'animate-bounce-start')}>{user ? user.openai.balance : '请登录后查看！'}</p>
					<p>, Platform: <span className={'font-bold'}>{_.upperCase(platform_type)}</span></p>
				</span>
				<span className={'hidden'}>, Detail: {JSON.stringify(conversationParams)}</span>
			</div>
			
			<ScrollArea className={'w-full grow overflow-hidden flex flex-col'}>
				{/* messages */}
				{messages.map((msg, index) => <MessageComp msg={msg} key={index}/>)}
				
				{/* for scroll */}
				<div ref={refMessageEnd} className={'w-full'}/>
			</ScrollArea>
			
			
			{/* for stretch, since flex-end cannot combine with overflow-auto */}
			<div className={'hidden md:block grow'}/>
			<div className={clsx(c, 'w-full relative ')}>
				<Textarea
					className={'mt-2 mb-10 md:mb-2 w-full shadow-sm resize-none'}
					onCompositionStart={(event) => {
						console.log({ compositionStart: event })
					}}
					onCompositionEnd={(event) => {
						console.log({ compositionEnd: event })
					}}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							if (
								!event.metaKey && !event.shiftKey && !event.ctrlKey
								&& !event.nativeEvent.isComposing  // important! 检测是否在输入拼音，ref: (6条消息) js如何判断当前文本的输入状态——中文输入法的那些坑_怎么判断当前输入法是不是中文_小敏哥的博客-CSDN博客, https://blog.csdn.net/handsomexiaominge/article/details/80977402
							) {
								onSubmit()
								event.preventDefault() // prevent enter go down
							}
						}
					}}
					ref={refMessageSend}
					placeholder={u.ui.general.textarea.placeholder}
				/>
				<IconBrandTelegram className={'hidden md:block text-primary absolute right-3 bottom-6 cursor-pointer'} onClick={onSubmit}/>
			</div>
			
			<div className={'md:hidden fixed bottom-0 left-0 w-full grid grid-cols-2 divide-x divide-y-0 divide-slate-500'}>
				<Sheet>
					<SheetTrigger asChild>
						<Button size={'sm'} className={'rounded-none'}>{u.ui.chat.btn.conversations}</Button>
					</SheetTrigger>
					<SheetContent className={'w-1/2 p-0 pt-10'} position={'left'}>
						{conversationsComp}
					</SheetContent>
				</Sheet>
				
				<Button size={'sm'} className="rounded-none" onClick={onSubmit}>{u.ui.general.btn.send}</Button>
			</div>
		</div>
	)
}
