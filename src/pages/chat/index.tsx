import { ChatLayout } from '@/components/layouts/ChatLayout'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { IConversation, IMessage } from '@/ds/conversation'
import { useState } from 'react'

export type ChatgptModelType = 'gpt-3.5' | 'gpt-4'

export const ConversationPage = ({ conversations, messages }: {
	conversations: IConversation[]
	messages: IMessage[]
}) => {
	const router = useRouter()
	const id = router.query.conversation_id
	console.log({ id })
	
	const [model, setModel] = useState<ChatgptModelType>('gpt-3.5')
	
	return (
		<ChatLayout conversations={conversations}>
			<div className={'w-full h-12 flex justify-center items-center bg-bg-sub font-semibold'}>Model: {model}</div>
			
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
