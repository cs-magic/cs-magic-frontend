import { clsx } from 'clsx'
import { FC, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageComp } from '@/components/shared/MessageComp'
import { Textarea } from '@/components/ui/textarea'
import { IconBrandTelegram } from '@tabler/icons-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { ConversationsComp } from './ConversationsComp'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ID } from '@/ds/general'
import { ContentType, IChatMessage, ModelPlatformType } from '@/ds/message'
import { useAskChatGPTMutation, useCreateConversationMutation, useGetUserChatGPTQuery, useListMessagesQuery } from '@/states/apis/openai/chatgptApi'
import { CHATGPT_MODEL_35_TURBO, ChatgptModelType, RoleType } from '@/ds/chatgpt'
import { skipToken } from '@reduxjs/toolkit/query'
import { useUserId } from '@/hooks/use-user'
import { toast } from '@/hooks/use-toast'
import { CentralLoadingComp } from '@/components/views/CentralLoadingComp'

const c = 'text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex m-auto break-all'


export const ConversationComp: FC<{
	conversation_id: ID | null
}> = ({ conversation_id }) => {
	
	const user_id = useUserId()
	
	const [model, setModel] = useState<ChatgptModelType>(CHATGPT_MODEL_35_TURBO)
	const [messages, setMessages] = useState<IChatMessage[]>([])
	
	const { data: initMessages = [], isFetching: isFetchingMessages, isSuccess } =
		// ref: https://redux-toolkit.js.org/rtk-query/usage/cache-behavior#encouraging-re-fetching-with-refetchonmountorargchange
		useListMessagesQuery(conversation_id ?? skipToken, { refetchOnMountOrArgChange: true })
	const [askChatGPT, { isLoading: isLoadingResponse }] = useAskChatGPTMutation()
	const { data: userChatGPT } = useGetUserChatGPTQuery(user_id ?? skipToken)
	const [createConversation, {}] = useCreateConversationMutation()
	
	const refMessageSend = useRef<HTMLTextAreaElement | null>(null)
	const refMessageEnd = useRef<HTMLDivElement | null>(null)
	
	
	useEffect(() => {
			console.log({ conversation_id, isSuccess, initMessages })
			
			if (!conversation_id) {
				setMessages([])
			} else {
				setMessages(initMessages)
			}
		},
		[conversation_id, initMessages])
	
	useEffect(() => refMessageEnd.current?.scrollIntoView({ behavior: 'smooth' }), [messages.length])
	
	const onSubmit = async () => {
		if (!user_id) return toast({ title: '聊天功能需要先登录再使用！', variant: 'destructive' })
		
		const content = refMessageSend.current!.value
		refMessageSend.current!.value = ''
		
		if (!conversation_id) {
			conversation_id = (await createConversation({ user_id, model }).unwrap()).id
			console.log('created conversation: ', conversation_id)
		}
		
		const msg: IChatMessage = {
			user_id,
			conversation_id,
			role: RoleType.user,
			content,
			content_type: ContentType.text,
			time: Date.now(),
			model_platform: ModelPlatformType.chatgpt,
		}
		setMessages((messages) => [...messages, msg])
		
		const res = await askChatGPT(msg).unwrap()
		setMessages((messages) => [...messages, res])
	}
	
	
	if (isFetchingMessages) return <CentralLoadingComp/>
	
	
	return (
		<div className={'grow h-full overflow-hidden flex flex-col'}>
			<Button variant={'ghost'} className={'w-full rounded-none mb-1 flex justify-center items-center bg-bg-sub font-semibold'}>
				Model: {model}{userChatGPT?.balance && `, Tokens: ${userChatGPT.balance}`}
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
							<ConversationsComp conversation_id={conversation_id}/>
						</SheetContent>
					</Sheet>
					<Button size={'sm'} onClick={onSubmit}>Send</Button>
				</div>
			</div>
		</div>
	)
}
