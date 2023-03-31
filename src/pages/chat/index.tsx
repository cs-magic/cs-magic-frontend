import { ChatLayout } from '@/components/layouts/ChatLayout'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { IConversation, IMessage } from '@/ds/conversation'
export const ConversationPage = ({ conversationList, conversationMessages }: {
	conversationList: IConversation[]
	conversationMessages: IMessage[]
}) => {
	
	
	const router = useRouter()
	const id = router.query.conversation_id
	
	console.log({id})
	
	return (
		<ChatLayout conversations={conversationList}>
			<div>Messages</div>
			{
				conversationMessages.map((msg) => (
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
			conversationMessages: [],
		},
	}
}
