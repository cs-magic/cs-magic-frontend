import { ChatLayout } from '@/comps/layouts/ChatLayout'

export type ID = string

export interface IUser {
	name: string
}

export interface IConversation {
	id: ID
	sender: IUser
	time: number
	content: string
}

export const ConversationPage = ({ conversationList, conversationMessages }: {
	conversationList: string[]
	conversationMessages: IConversation[]
}) => {
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


export const getServerSideProps = async () => {
	return {
		props: {
			conversationList: [],
			conversationMessages: [],
		},
	}
}
