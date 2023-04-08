import { useRouter } from 'next/router'
import { CHATGPT_MODEL_35_TURBO, ChatgptModelType } from '@/ds/chatgpt'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { selectMessages, setMessages } from '@/states/features/messageSlice'
import { selectConversationID, selectConversations, setCurConversationID } from '@/states/features/conversationSlice'
import { IconBrandOpenai, IconBrandTelegram } from '@tabler/icons-react'
import { selectUserId } from '@/states/features/userSlice'
import { sendChat } from '@/states/thunks/chatgpt'
import { ensureSole } from '@/lib/utils'
import { clsx } from 'clsx'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { RootLayout } from '@/components/layouts/RootLayout'
import { CompConversations } from '@/components/shared/CompConversations'
import { ChatgptRoleType, IChatgptConversation } from '@/ds/chatgpt_v2'
import { createChatgptConversation, listChatgptMessages } from '@/api/chatgpt'
import { ID } from '@/ds/general'


export const ConversationPage = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	
	const user_id = useAppSelector(selectUserId) // should exist user id now (except if fpjs error)
	const router_conversation_id = ensureSole(router.query.conversation_id || null)
	const state_conversation_id = useAppSelector(selectConversationID)
	const conversation_id = router_conversation_id || state_conversation_id
	
	const conversations = useAppSelector(selectConversations)
	const messages = useAppSelector(selectMessages)
	
	const [model, setModel] = useState<ChatgptModelType>(CHATGPT_MODEL_35_TURBO)
	
	const refMessage = useRef<HTMLTextAreaElement | null>(null)
	
	const { toast } = useToast()
	
	const onSubmit = async () => {
		if (!user_id) {
			toast({ variant: 'destructive', title: '用户未初始化' })
			return
		}
		if (!conversation_id) {
			toast({ variant: 'destructive', title: '会话未初始化' })
			return
		}
		const content = refMessage.current!.value
		if (!content.trim()) {
			toast({ variant: 'destructive', title: '输入不能为空', duration: 2000 })
			return
		}
		refMessage.current!.value = ''
		const res = await dispatch(sendChat({ user_id, conversation_id, model, content }))
		console.log('res:', res)
		if (res.meta.requestStatus === 'rejected') {
			toast({ variant: 'destructive', title: res.payload as string, duration: 3000 })
		}
	}
	
	const createConversation = async (user_id: ID, model: string): Promise<IChatgptConversation> => {
		const conversation: IChatgptConversation = await createChatgptConversation(user_id, model)
		await dispatch(setCurConversationID(conversation.id))
		return conversation
	}
	const initMessages = async (user_id: ID, conversation_id: ID, model: string) => {
		const messages = await listChatgptMessages(user_id, conversation_id, model)
		await dispatch(setMessages(messages))
	}
	
	console.log({ user_id, conversation_id, conversations, messages, model })
	useEffect(() => {
		if (user_id) {
			if (!conversation_id) {
				createConversation(user_id, model)
			} else {
				initMessages(user_id, conversation_id, model)
			}
		}
	}, [user_id, conversation_id])
	
	const c = 'text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto'
	
	return (
		<RootLayout title={'免翻 ChatGPT PLUS'}>
			<div className={'flex w-full grow overflow-auto'}>
				
				{/* left: conversations */}
				<CompConversations/>
				
				{/* right: current conversation */}
				<div className={'flex-1 flex flex-col h-full'}>
					<div className={'w-full h-12 flex justify-center items-center bg-bg-sub font-semibold'}>Model: {model}</div>
					
					<div className={'grow overflow-auto'}>
						{
							messages.map((msg, index) => (
								<div key={index} className={clsx(
									'w-full',
									msg.role === ChatgptRoleType.assistant ? 'bg-gray-50 dark:bg-[#444654]' : 'dark:bg-gray-800',
								)}>
									{/*// 这里直接copy的chatgpt居中的css*/}
									<div className={clsx(c)}>
										
										{
											msg.role === ChatgptRoleType.assistant
												? <IconBrandOpenai size={24} className={'shrink-0'}/>
												: (
													<Avatar className={'w-6 h-6 shrink-0'}>
														<AvatarFallback>
															{user_id ? user_id[0] : 'U'}
														</AvatarFallback>
													</Avatar>
												)
										}
										
										{msg.content}
									</div>
								</div>
							))
						}
					</div>
					
					<div className={'w-full'}>
						<div className={clsx(c, 'relative')}>
							<Textarea
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										if (!event.metaKey && !event.shiftKey && !event.ctrlKey) {
											onSubmit()
											event.preventDefault() // prevent enter go down
										}
									}
								}}
								className={'w-full shadow-xl'}
								ref={refMessage}
								placeholder="Type your message here."
							/>
							<IconBrandTelegram className={'absolute right-3 bottom-8 cursor-pointer'} onClick={onSubmit}/>
						</div>
					</div>
				</div>
			</div>
		</RootLayout>
	)
}

export default ConversationPage
