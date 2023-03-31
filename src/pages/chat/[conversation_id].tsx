import { ChatLayout } from '@/components/layouts/ChatLayout'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { IConversation, IMessage, RoleType } from '@/ds/conversation'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'
import api from '@/lib/api'
import { ID } from '@/ds/general'
import { useAppDispatch } from '@/states/hooks'
import { addMessage, selectMessages } from '@/states/features/messages'
import { useSelector } from 'react-redux'
import { v4 } from 'uuid'


export const ConversationPage = ({ conversations }: {
	conversations: IConversation[]
}) => {
	
	const router = useRouter()
	const conversation_id = router.query.conversation_id as string
	const messages = useSelector(selectMessages)
		.filter((msg) => msg.conversation_id === conversation_id)
	console.log({ conversation_id, conversations, messages })
	
	const dispatch = useAppDispatch()
	
	const refMessage = useRef<HTMLTextAreaElement | null>(null)
	
	const genMessage = (content: string, role: RoleType): IMessage => ({
		id: v4(),
		conversation_id,
		time: Date.now(),
		role,
		content,
	})
	
	const onSubmit = async () => {
		const sendingMessage = refMessage.current!.value
		refMessage.current!.value = ''
		console.log('sending message:', sendingMessage)
		
		dispatch(addMessage(genMessage(sendingMessage, RoleType.user)))
		
		const res = await api.post('/openai/chatgpt/reverse/chat', {
			client_id: 'test001',
			conversation_id,
			message: sendingMessage,
		})
		const receivedMessage = res.data
		console.log('received response: ', receivedMessage)
		dispatch(addMessage(genMessage(receivedMessage, RoleType.assistant)))
	}
	
	return (
		<ChatLayout conversations={conversations}>
			
			<div className={'w-full flex-1'}>
				<div>Messages</div>
				{
					messages.map((msg, index) => (
						<div key={index}>{msg.content}</div>
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
	const res = await api.get('/openai/chatgpt/reverse/conversations', {
		params: {
			client_id,
		},
	})
	const conversations = res.data as string[]
	console.log({ conversations })
	// todo: title
	return conversations.map((conversation) => ({ id: conversation, title: conversation }))
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	// todo: dynamically
	const client_id = 'test001'
	const { conversation_id } = ctx.query as { conversation_id: string }
	const conversations = await getConversations(client_id)
	
	return {
		props: {
			conversations,
		},
	}
}
