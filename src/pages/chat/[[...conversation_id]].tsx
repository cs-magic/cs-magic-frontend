import { ChatLayout } from '@/components/layouts/ChatLayout'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { IChatbotConversation, IChatbotConversationBase, IMessage, RoleType } from '@/ds/conversation'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRef, useState } from 'react'
import api from '@/lib/api'
import { ID } from '@/ds/general'

import { CompChatBox } from '@/components/shared/CompChatBox'


export type ChatgptModelType = 'gpt-3.5' | 'gpt-4'


/**
 * todo: fetch messages with redux
 *
 * @param {IChatbotConversation[]} conversations
 * @param {IMessage[]} messages
 * @returns {JSX.Element}
 * @constructor
 */
export const ConversationPage = ({ conversations, messages }: {
	conversations: IChatbotConversation[],
	messages: IMessage[]
}) => {
	
	const router = useRouter()
	const conversation_id = router.query.conversation_id as string
	const [model, setModel] = useState<ChatgptModelType>('gpt-3.5')
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
			
			<CompChatBox conversation_id={conversation_id}/>
		
		</ChatLayout>
	)
}

export default ConversationPage


export const getConversations = async (user_id: ID): Promise<IChatbotConversationBase[]> => {
	const res = await api.get('/chatgpt/conversations', {
		params: {
			user_id,
		},
	})
	const conversations = res.data as IChatbotConversationBase[]
	console.log({ conversations })
	return conversations
}

export const getMessages = async (user_id: ID, conversation_id: ID): Promise<IMessage[]> => {
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
	const conversations = await getConversations(user_id)
	const messages = await getMessages(user_id, conversation_id)
	
	return {
		props: {
			conversations,
			messages,
		},
	}
}
