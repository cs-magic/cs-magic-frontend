import { Button } from '@/components/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { ConversationLineComp } from '@/components/shared/ConversationLineComp'
import { FC } from 'react'
import { ID } from '@/ds/general'
import { IChatgptConversation } from '@/ds/chatgpt'

export const ConversationsComp: FC<{
	conversation_id: ID | null
	conversations: IChatgptConversation[]
}> = (props) => {
	
	const router = useRouter()
	
	return (
		<div className={'w-full h-full flex flex-col bg-bg-sub'}>
			
			<Button className={'w-full inline-flex items-center gap-2 rounded-none mb-1'} variant={'subtle'} onClick={() => {
				router.push('/chat')
			}}>
				<IconPlus size={16}/>
				<p>New Chat</p>
			</Button>
			
			<div className={clsx(
				'w-full flex-1 overflow-y-auto',
				'flex justify-end flex-col-reverse', // 倒序展示
			)}>
				{
					props.conversations.map((conversation) =>
						<ConversationLineComp
							key={conversation.id}
							conversation={conversation}
							isHighlight={props.conversation_id === conversation.id}
						/>)
				}
			</div>
		
		
		</div>
	)
}
