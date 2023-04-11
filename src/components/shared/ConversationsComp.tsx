import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { selectChatgptConversationID, selectConversations } from '@/states/features/conversationSlice'
import { IconPlus, IconUser } from '@tabler/icons-react'
import { useEffect } from 'react'
import { Separator } from '../ui/separator'
import { selectUserId } from '@/states/features/userSlice'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { UserAccountComp } from '@/components/shared/UserAccountComp'
import { asyncSetConversationID, asyncSetConversations } from '@/states/thunks/chatgpt'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { ConversationLineComp } from '@/components/shared/ConversationLineComp'
import { ChatgptAccountComp } from '@/components/shared/ChatgptAccountComp'

export const ConversationsComp = ({}) => {
	
	const user_id = useAppSelector(selectUserId)
	const conversation_id = useAppSelector(selectChatgptConversationID)
	const conversations = useAppSelector(selectConversations)
	
	const dispatch = useAppDispatch()
	const router = useRouter()
	
	useEffect(() => {
		if (user_id) dispatch(asyncSetConversations(user_id))
	}, [user_id])
	
	
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
					conversations.map((conversation) =>
						<ConversationLineComp conversation={conversation} key={conversation.id}/>)
				}
			</div>
			
			<Separator/>
		
			{/* 暂时先不要了，因为token直接可以在header里更新 */}
			{/*<ChatgptAccountComp/>*/}
		
		</div>
	)
}
