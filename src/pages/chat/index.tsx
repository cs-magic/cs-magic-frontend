import { ChatLayout } from '@/components/layouts/ChatLayout'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { IConversation, IMessage } from '@/ds/conversation'
export const ConversationPage = ({ conversations, messages }: {
	conversations: IConversation[]
	messages: IMessage[]
}) => {
	
	
	const router = useRouter()
	const id = router.query.conversation_id
	
	console.log({id})
	
	return (
		<ChatLayout conversations={conversations}>
			<div>Messages</div>
			{
				messages.map((msg) => (
					<div key={msg.id}>{msg.content}</div>
				))
			}
		</ChatLayout>
	)
}

export default ConversationPage


export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {
			conversations: [],
			messages: [],
		},
	}
}
