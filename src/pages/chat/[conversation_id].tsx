import { ChatLayout } from '@/components/layouts/ChatLayout'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { IConversation, IMessage } from '@/ds/conversation'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'
import api from '@/lib/api'
import { ID } from '@/ds/general'


export const ConversationPage = ({ conversations, conversationMessages }: {
	conversations: IConversation[]
	conversationMessages: IMessage[]
}) => {
	
	const router = useRouter()
	const { conversation_id } = router.query
	
	console.log({ conversation_id })
	
	const refMessage = useRef<HTMLTextAreaElement | null>(null)
	
	
	const onSubmit = async () => {
		const message = refMessage.current!.value
		console.log('sending message:', message)
		
		const res = await api.post('/v1/openai/chatgpt/reverse/chat', {
			client_id: 'test001',
			conversation_id,
			message,
		})
		console.log('received response: ', res.data)
		
		refMessage.current!.value = ''
	}
	
	return (
		<ChatLayout conversations={conversations}>
			
			<div className={'w-full flex-1'}>
				<div>Messages</div>
				{
					conversationMessages.map((msg) => (
						<div key={msg.id}>{msg.content}</div>
					))
				}
			</div>
			
			<div className="grid w-full gap-2">
				<Textarea ref={refMessage} placeholder="Type your message here."/>
				<Button type={'button'} onClick={onSubmit}>Send</Button>
			</div>
		</ChatLayout>
	)
}

export default ConversationPage


export const getConversations = async (client_id: ID): Promise<IConversation[]> => {
	const res = await api.get('/v1/openai/chatgpt/reverse/conversations', {
		params: {
			client_id
		}
	})
	const conversations = res.data as string[]
	console.log({conversations})
	// todo: title
	return conversations.map((conversation) => ({ id: conversation, title: conversation }))
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const conversations = await getConversations('test001')
	return {
		props: {
			conversations,
			conversationMessages: [],
		},
	}
}
