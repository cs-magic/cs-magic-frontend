import { IConversation, IMessage } from '@/ds/conversation'
import conversation_id from '@/pages/chat/[conversation_id]'
import { Button } from '@/components/ui/button'

export const CompSidebar = ({ conversations }: {
	conversations: IConversation[]
}) => {
	return (
		<div className={'hidden md:block w-[240px] bg-bg-shade flex flex-col p-2 gap-2'}>
			<Button className={'w-full'} variant={'subtle'}>New Chat</Button>
			
			{
				conversations.map((conversation) => (
					<div key={conversation.id} className={'truncate'}>
						{conversation.title || conversation.id}
					</div>
				))
			}
		</div>
	)
}
