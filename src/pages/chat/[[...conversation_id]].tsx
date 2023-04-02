import { ChatLayout } from '@/components/layouts/ChatLayout'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { IChatbotConversation, IChatbotConversationBase, IMessage, RoleType } from '@/ds/conversation'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import api from '@/lib/api'
import { ID } from '@/ds/general'

import { CompChatBox } from '@/components/shared/CompChatBox'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { selectMessages, setMessages } from '@/states/features/messages'
import { selectConversations, setConversations } from '@/states/features/conversations'


export type ChatgptModelType = 'gpt-3.5-turbo' | 'gpt-4'


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
	
	const dispatch = useAppDispatch()
	
	useEffect(() => {
		dispatch(setConversations(conversationsSSR))
		dispatch(setMessages(messagesSSR))
	}, [])
	
	const conversations = useAppSelector(selectConversations)
	const messages = useAppSelector(selectMessages)
	
	const router = useRouter()
	
	// todo: string|string[]|undefined --> string|undefined
	let conversation_id = router.query.conversation_id as string | undefined
	
	const [model, setModel] = useState<ChatgptModelType>('gpt-3.5-turbo')
	console.log({ conversation_id, conversations, messages, model })
	
	
	return (
		<ChatLayout conversations={conversations}>
			
			<div className={'w-full flex-1'}>
				<div className={'w-full h-12 flex justify-center items-center bg-bg-sub font-semibold'}>Model: {model}</div>
				{
					messages.map((msg, index) => (
						<div key={index}>{msg.content}</div>
					))
				}
			</div>
			
			<CompChatBox conversation_id={conversation_id} model={model}/>
		
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

export const fetchMessages = async (user_id: ID, conversation_id: ID): Promise<IMessage[]> => {
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
	const { conversation_id } = ctx.query as { conversation_id: string }
	const conversationsSSR = await fetchConversations(user_id)
	const messagesSSR = await fetchMessages(user_id, conversation_id)
	
	return {
		props: {
			conversationsSSR,
			messagesSSR,
		},
	}
}
