import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { IconPlus } from '@tabler/icons-react'
import { selectUserId } from '@/states/features/userSlice'
import { asyncSetConversationID } from '@/states/thunks/chatgpt'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { ConversationLineComp } from '@/components/shared/ConversationLineComp'
import { useListConversationsQuery } from '@/states/apis/chatgptConversationApi'
import { FC } from 'react'
import { ID } from '@/ds/general'

export const ConversationsComp: FC<{
	conversation_id: ID | null
}> = ({ conversation_id }) => {
	
	const user_id = useAppSelector(selectUserId)
	const { data: conversations } = useListConversationsQuery(user_id)
	
	const dispatch = useAppDispatch()
	const router = useRouter()
	
	return (
		<div className={'w-full h-full flex flex-col bg-bg-sub'}>
			
			<Button className={'w-full inline-flex items-center gap-2 rounded-none mb-1'} variant={'subtle'} onClick={() => {
				if (!conversation_id) dispatch(asyncSetConversationID(null))
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
					(conversations ?? []).map((conversation) =>
						<ConversationLineComp conversation={conversation} key={conversation.id} isHighlight={conversation_id === conversation.id}/>)
				}
			</div>
		
		
		</div>
	)
}
