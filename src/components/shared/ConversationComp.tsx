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
import { useToast } from '@/hooks/use-toast'
import { MessageRoleType, DalleDimensionType, IMessage, IMessageParams, MessageType } from '@/ds/openai/message'
import { PlatformType } from '@/ds/openai/general'
import { injectOpenAIConversation } from '@/api/conversationApi'
import { injectOpenAIMessages } from '@/api/messageApi'
import { ChatgptModelType, IChatGPTConversationParams, IConversationParams, ICreateConversation, IDalleConversationParams } from '@/ds/openai/conversation'

const c = 'text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex m-auto break-all'


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
	
	const { toast } = useToast()
	const user = useUser()
	const user_id = user?.id
	const [messages, setMessages] = useState<IMessage<T>[]>([])
	const [conversation_id, setConversationId] = useState(cid)
	
	const [createConversation] = useCreateConversationMutation()
	const { currentData: _messages = [] } = useListMessagesQuery(conversation_id ? { conversation_id, platform_type } : skipToken)
	const [sendMessage, { isLoading: isLoadingResponse, error: openAIError, data: openAIResponse }] = useSendMessageMutation()
	
	const refMessageSend = useRef<HTMLTextAreaElement | null>(null)
	const refMessageEnd = useRef<HTMLDivElement | null>(null)
	
	const [conversationParams, setConversationParams] = useState<IConversationParams<T>>(platform_type === PlatformType.chatGPT ? ({
		model: ChatgptModelType.gpt35,
		selected: [],
	} as IConversationParams<PlatformType.chatGPT> as IConversationParams<T>) : ({} as IConversationParams<PlatformType.dalle> as IConversationParams<T>))
	
	const [messageParams, setMessageParams] = useState<IMessageParams<T>>(platform_type === PlatformType.chatGPT ? ({
		role: MessageRoleType.user,
	} as IMessageParams<PlatformType.chatGPT> as IMessageParams<T>) : ({
		role: MessageRoleType.user,
		dimension: DalleDimensionType.sm,
	} as IMessageParams<PlatformType.dalle> as IMessageParams<T>))
	
	// update conversation id upon prop changes
	useEffect(() => {
		setConversationId(cid)
	}, [cid])
	
	// update messages upon initialization
	useEffect(() => {if (_messages.length) setMessages(_messages)}, [_messages])
	
	// update messages upon receiving response
	useEffect(() => {
		if (!openAIResponse) return
		console.log({ openAIResponse })
		setMessages([...messages, openAIResponse])
	}, [openAIResponse])
	
	// toast errors
	useEffect(() => {
		if (!openAIError) return
		console.log({ openAIError })
		toast({ title: ((openAIError as FetchBaseQueryError).data as { detail: string }).detail, variant: 'destructive' })
	}, [openAIError])
	
	// auto scroll
	useEffect(() => refMessageEnd.current?.scrollIntoView({ behavior: 'smooth' }), [messages.length])
	
	const onSubmit = async () => {
		if (!user_id) return toast({ title: '聊天功能需要先登录再使用！', variant: 'destructive' })
		if (messages.length % 2) return toast({ title: '请耐心等待回复完成', variant: 'destructive' })
		
		const content = refMessageSend.current!.value
		refMessageSend.current!.value = ''
		
		const send = async (conversation_id: string) => {
			const msg: IMessage<T> = {
				conversation_id,
				content,
				type: MessageType.text,
				platform_type,
				platform_params: messageParams,
			}
			setMessages((messages) => [...messages, msg])
			await sendMessage(msg).unwrap()
		}
		
		if (conversation_id) return await send(conversation_id)
		
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
			const createConversationModel = {
				user_id,
				platform_type,
				platform_params: platform_type === PlatformType.chatGPT ? {
					model: ChatgptModelType.gpt35,
					selected: [],
				} as IChatGPTConversationParams : {
					dimension: '256x256',
				} as IDalleConversationParams,
			} as ICreateConversation<T>
			
			
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
		await send(newConversationID)
		setConversationId(newConversationID)
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
