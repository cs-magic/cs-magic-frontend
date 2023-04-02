import { ChatLayout } from '@/components/layouts/ChatLayout'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { IChatbotConversation, IChatbotConversationBase, IMessage, RoleType } from '@/ds/conversation'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useRef, useState } from 'react'
import api from '@/lib/api'
import { ID } from '@/ds/general'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { selectMessages, setMessages } from '@/states/features/messages'
import { selectConversations, setConversations } from '@/states/features/conversations'
import { IconBrandTelegram } from '@tabler/icons-react'
import { selectUserID } from '@/states/features/user'
import { sendChat } from '@/states/thunks/chat'
import { ensureSole } from '@/lib/utils'
import { clsx } from 'clsx'
import { CompOpenaiLogo } from '@/components/svg/CompOpenaiLogo'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'


export type ChatgptModelType = 'gpt-3.5' | 'gpt-4'


/**
 * todo: fetch messages with redux
 *
 * @param {IChatbotConversation[]} conversations
 * @param {IMessage[]} messages
 * @returns {JSX.Element}
 * @constructor
 */
export const ConversationPage = ({ conversationsSSR, messagesSSR }: {
	conversationsSSR: IChatbotConversation[],
	messagesSSR: IMessage[]
}) => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	
	const user_id = useAppSelector(selectUserID)
	let conversation_id = ensureSole(router.query.conversation_id)
	
	const conversations = useAppSelector(selectConversations)
	const messages = useAppSelector(selectMessages)
	
	const [model, setModel] = useState<ChatgptModelType>('gpt-3.5')
	console.log({ user_id, conversation_id, conversations, messages, model })
	
	const refMessage = useRef<HTMLTextAreaElement | null>(null)
	
	const onSubmit = async () => {
		dispatch(sendChat({
			user_id,
			conversation_id,
			model,
			content: refMessage.current!.value,
		}))
		refMessage.current!.value = ''
	}
	
	useEffect(() => {
		dispatch(setConversations(conversationsSSR))
		dispatch(setMessages(messagesSSR))
	}, [conversation_id])
	
	const c = 'text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto'
	
	return (
		<ChatLayout conversations={conversations}>
			
			<div className={'w-full h-12 flex justify-center items-center bg-bg-sub font-semibold'}>Model: {model}</div>
			<div className={'flex-1'}>
				{
					messages.map((msg, index) => (
						<div key={index} className={clsx(
							'w-full',
							msg.role === RoleType.assistant ? 'bg-gray-50 dark:bg-[#444654]' : 'dark:bg-gray-800',
						)}>
							{/*// 这里直接copy的chatgpt居中的css*/}
							<div className={clsx(c)}>
								{
									msg.role === RoleType.assistant ? <CompOpenaiLogo/> : (
										<Avatar className={'w-6 h-6'}>
											<AvatarFallback>{user_id[0]}</AvatarFallback>
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
		
		</ChatLayout>
	)
}

export default ConversationPage


export const fetchConversations = async (user_id: ID): Promise<IChatbotConversationBase[]> => {
	const res = await api.get('/chatgpt/conversations', {
		params: {
			user_id,
		},
	})
	const conversations = res.data as IChatbotConversationBase[]
	console.log({ conversations })
	return conversations
}

export const fetchMessages = async (user_id: ID, conversation_id?: ID): Promise<IMessage[]> => {
	if (!conversation_id) return []
	const res = await api.get('/chatgpt/conversation', {
		params: {
			user_id,
			conversation_id,
		},
	})
	const conversation = res.data as IChatbotConversation
	console.log({ conversation })
	return conversation.messages
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	// todo: dynamically
	const user_id = 'test-user-001'
	let conversation_id = ctx.query.conversation_id
	if (Array.isArray(conversation_id)) conversation_id = conversation_id.join('-')
	console.log({ conversation_id })
	const conversationsSSR = await fetchConversations(user_id)
	const messagesSSR = await fetchMessages(user_id, conversation_id)
	
	return {
		props: {
			conversationsSSR,
			messagesSSR,
		},
	}
}
