import { clsx } from 'clsx'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageComp } from '@/components/shared/MessageComp'
import { Textarea } from '@/components/ui/textarea'
import { IconBrandTelegram } from '@tabler/icons-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ID } from '@/ds/general'
import { FetchBaseQueryError, skipToken } from '@reduxjs/toolkit/query'
import { useUser } from '@/hooks/use-user'
import { DalleDimensionType, IMessage, IMessageParams, MessageRoleType, MessageType } from '@/ds/openai/message'
import { PlatformType } from '@/ds/openai/general'
import { injectOpenAIConversation } from '@/api/conversationApi'
import { injectOpenAIMessages } from '@/api/messageApi'
import { ChatgptModelType, IConversationParams, ICreateConversation } from '@/ds/openai/conversation'

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


export const ConversationComp = <T extends PlatformType>(
	{
		cid,
		platform_type,
		conversationsComp,
	}: {
		cid: ID | null
		platform_type: T
		conversationsComp: ReactNode
	}) => {
	
	const {
		useCreateConversationMutation,
	} = injectOpenAIConversation<T>()
	
	const {
		useListMessagesQuery,
		useSendMessageMutation,
	} = injectOpenAIMessages<T>()
	
	const user = useUser()
	const user_id = user?.id
	
	const [conversation_id, setConversationId] = useState(cid)
	const [messages, setMessages] = useState<IMessage<T>[]>([])
	const { currentData: initedMessages } = useListMessagesQuery(cid ? { conversation_id: cid, platform_type } : skipToken)
	
	const [createConversation] = useCreateConversationMutation()
	const [sendMessage, { isLoading: isLoadingResponse, error: openAIError, data: openAIResponse }] = useSendMessageMutation()
	
	const [conversationParams, setConversationParams] = useState<IConversationParams<T>>(initConversationParams<T>(platform_type))
	const [messageParams, setMessageParams] = useState<IMessageParams<T>>(initMessageParams<T>(platform_type))
	
	const refMessageSend = useRef<HTMLTextAreaElement | null>(null)
	const refMessageEnd = useRef<HTMLDivElement | null>(null)
	
	const pushMessage = (message: IMessage<T>) => setMessages((messages) => [...messages, message])
	
	
	// update conversation id upon prop changes
	useEffect(() => {
		console.log({ cid })
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
	
	// update messages upon receiving response
	useEffect(() => {
		if (!openAIResponse) return
		console.log({ openAIResponse })
		pushMessage(openAIResponse)
	}, [openAIResponse])
	
	// toast errors
	useEffect(() => {
		if (!openAIError) return
		console.log({ openAIError })
		const msg: IMessage<T> = {
			status: 'ERROR',
			content: ((openAIError as FetchBaseQueryError).data as { detail: string }).detail,
			conversation_id: conversation_id!,
			type: MessageType.text,
			platform_type,
			platform_params: { ...messageParams, role: MessageRoleType.assistant },
		}
		pushMessage(msg)
	}, [openAIError])
	
	// auto scroll
	useEffect(() => refMessageEnd.current?.scrollIntoView({ behavior: 'smooth' }), [messages.length])
	
	const onSubmit = async () => {
		const content = refMessageSend.current!.value
		refMessageSend.current!.value = ''
		
		let success = true, detail = ''
		if (!user_id) {
			success = false
			detail = '聊天功能需要先登录再使用！'
		} else if (messages.length % 2) {
			success = false
			detail = '请耐心等待回复完成'
		}
		
		let msg: IMessage<T> = {
			conversation_id: conversation_id || '',
			content,
			type: MessageType.text,
			platform_type,
			platform_params: messageParams,
		}
		pushMessage(msg)
		
		// 直接处理 client 端错误
		if (!success) return pushMessage({ ...msg, status: 'ERROR', content: detail })
		
		if (conversation_id) return await sendMessage(msg)
		
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
		
		const newConversationID = await _createConversation()
		setConversationId(newConversationID)
		await sendMessage({ ...msg, conversation_id: newConversationID })
	}
	
	
	// 这个加了会闪屏，还是不要加了，温和点
	// if (isFetchingMessages) return <CentralLoadingComp/>
	
	
	return (
		<div className={'grow h-full overflow-hidden flex flex-col'}>
			<Button variant={'ghost'} className={'w-full rounded-none mb-1 flex justify-center items-center bg-bg-sub font-semibold'}>
				Tokens: {user ? user.openai.balance : '请登录后查看！'}, Platform: {platform_type}, Detail: {JSON.stringify(conversationParams)}
			</Button>
			
			{/* for stretch, since flex-end cannot combine with overflow-auto */}
			<div className={'grow md:hidden'}/>
			
			<ScrollArea className={'w-full grow overflow-hidden flex flex-col'}>
				{/* messages */}
				{messages.map((msg, index) => <MessageComp msg={msg} key={index}/>)}
				
				{/* for scroll */}
				<div ref={refMessageEnd} className={'w-full'}/>
			</ScrollArea>
			
			
			{/* for stretch, since flex-end cannot combine with overflow-auto */}
			<div className={'hidden md:block grow'}/>
			
			{isLoadingResponse && (
				<div className={'w-full'}>
					<div className={c}>
						<div className={'px-2 inline-flex items-center w-full gap-4'}>
							<p className={'text-sm text-gray-500'}>耐心等待！可能需要十秒！因为OpenAI太忙了！</p>
							<progress className="progress progress-secondary flex-1"></progress>
						</div>
					</div>
				</div>
			)}
			
			<div className={'w-full mt-2 '}>
				<div className={clsx(c, 'relative py-2')}>
					<Textarea
						className={'w-full shadow-xl resize-none'}
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								if (!event.metaKey && !event.shiftKey && !event.ctrlKey) {
									onSubmit()
									event.preventDefault() // prevent enter go down
								}
							}
						}}
						ref={refMessageSend}
						placeholder="Type your message here."
					/>
					<IconBrandTelegram className={'hidden md:block absolute right-3 bottom-8 cursor-pointer'} onClick={onSubmit}/>
				</div>
				
				<div className={'md:hidden w-full grid grid-cols-2 gap-2 mt-2'}>
					<Sheet>
						<SheetTrigger asChild>
							<Button size={'sm'}>Conversations</Button>
						</SheetTrigger>
						<SheetContent className={'w-1/2 p-0'} position={'left'}>
							{conversationsComp}
						</SheetContent>
					</Sheet>
					<Button size={'sm'} onClick={onSubmit}>Send</Button>
				</div>
			</div>
		</div>
	)
}
