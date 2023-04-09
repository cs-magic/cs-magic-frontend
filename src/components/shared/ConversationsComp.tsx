import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { selectChatgptConversationID, selectConversations } from '@/states/features/conversationSlice'
import { IconPlus, IconSquareRoundedX } from '@tabler/icons-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { Separator } from '../ui/separator'
import { selectUserId } from '@/states/features/userSlice'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { UserAccountComp } from '@/components/shared/UserAccountComp'
import { useToast } from '@/hooks/use-toast'
import { asyncDelConversation, asyncSetConversations } from '@/states/thunks/chatgpt'
import { clsx } from 'clsx'
import { CompLine } from '@/components/views/IconLineView'
import { useRouter } from 'next/router'

export const ConversationsComp = ({}) => {
	
	const user_id = useAppSelector(selectUserId)
	const conversation_id = useAppSelector(selectChatgptConversationID)
	
	const dispatch = useAppDispatch()
	const router = useRouter()
	
	useEffect(() => {
		if (user_id) dispatch(asyncSetConversations(user_id))
	}, [user_id])
	
	const { toast } = useToast()
	
	const conversations = useAppSelector(selectConversations)
	
	return (
		<div className={'dark hidden bg-gray-900 text-gray-100 md:flex md:w-[260px] md:flex-col'}>
			
			<Link href={'/chat'}>
				<Button className={'w-full inline-flex items-center gap-2'} variant={'subtle'}>
					<IconPlus size={16}/>
					<p>New Chat</p>
				</Button>
			</Link>
			
			
			<div className={clsx(
				'flex-1 w-full overflow-y-auto',
				'flex justify-end flex-col-reverse', // 倒序展示
			)}>
				{
					conversations.map((conversation) => (
						<CompLine
							key={conversation.id}
							icon={'IconMessageCircle'}
							highlight={conversation.id === conversation_id}
							extra={
								<IconSquareRoundedX
									className={'hidden group-hover:block text-red-500'}
									onClick={() => {
										dispatch(asyncDelConversation(conversation.id))
										console.log({ cur: conversation_id, deleted: conversation.id })
										if (conversation.id === conversation_id) { // 当且仅当被删除conversation是当前conversation的时候才需要重定向
											console.log('redirecting to chat home page')
											router.push('/chat')
										}
									}}/>
							}>
							<Link className={'w-full truncate'} href={`/chat/${conversation.id}`} key={conversation.id}>
								{conversation.id}
							</Link>
						</CompLine>
					))
				}
			</div>
			
			<Separator/>
			
			<Dialog>
				<DialogTrigger>
					<CompLine icon={'IconUser'}>My Account</CompLine>
				</DialogTrigger>
				
				<DialogContent>
					<UserAccountComp/>
				</DialogContent>
			</Dialog>
			
			<CompLine icon={'IconLogout'} onClick={() => {
				toast({ title: 'todo', variant: 'destructive' })
			}}>Log Out</CompLine>
		</div>
	)
}
