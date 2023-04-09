import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { selectChatgptConversationID, selectConversations } from '@/states/features/conversationSlice'
import { IconPlus } from '@tabler/icons-react'
import { useEffect } from 'react'
import { Separator } from '../ui/separator'
import { selectUserId } from '@/states/features/userSlice'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { UserAccountComp } from '@/components/shared/UserAccountComp'
import { asyncSetConversationID, asyncSetConversations } from '@/states/thunks/chatgpt'
import { clsx } from 'clsx'
import { CompLine } from '@/components/views/IconLineView'
import { useRouter } from 'next/router'
import { ConversationLineComp } from '@/components/shared/ConversationLineComp'

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
		<div className={'dark w-full h-full flex flex-col bg-gray-900 text-gray-100 '}>
			
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
			
			<Dialog>
				<DialogTrigger asChild>
					<CompLine icon={'IconUser'}>My Chatgpt</CompLine>
				</DialogTrigger>
				
				<DialogContent>
					<UserAccountComp/>
				</DialogContent>
			</Dialog>
		
		</div>
	)
}
