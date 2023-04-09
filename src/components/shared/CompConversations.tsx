import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { selectConversations } from '@/states/features/conversationSlice'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import { ReactNode, useEffect } from 'react'
import { Separator } from '../ui/separator'
import { useSelector } from 'react-redux'
import { selectUserBasic, selectUserId } from '@/states/features/userSlice'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CompUserAccount } from '@/components/shared/CompUserAccount'
import { useToast } from '@/hooks/use-toast'
import { initConversations } from '@/states/thunks/chatgpt'
import { clsx } from 'clsx'
import { CompDynamicIcon } from '@/components/shared/CompDynamicIcon'

const CompLine = ({ icon, children, onClick }: { icon: string, children: ReactNode, onClick?: any }) => {
	return (
		<div className={'w-full p-3 inline-flex items-center gap-2 hover:bg-[#2A2B32] cursor-pointer'} onClick={onClick}>
			<CompDynamicIcon id={icon}/>
			<p className={'truncate'}>{children}</p>
		</div>
	)
}

export const CompConversations = ({}) => {
	
	const userId = useSelector(selectUserId)
	
	const dispatch = useAppDispatch()
	
	useEffect(() => {
		if (userId) dispatch(initConversations(userId))
	}, [userId])
	
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
				'flex flex-col-reverse', // 倒序展示
			)}>
				{
					conversations.map((conversation) => (
						<Link className={'w-full'} href={`/chat/${conversation.id}`} key={conversation.id}>
							<CompLine icon={'IconMessageCircle'}>
								{conversation.id}
							</CompLine>
						</Link>
					))
				}
			</div>
			
			<Separator/>
			
			<Dialog>
				<DialogTrigger>
					<CompLine icon={'IconUser'}>My Account</CompLine>
				</DialogTrigger>
				
				<DialogContent>
					<CompUserAccount/>
				</DialogContent>
			</Dialog>
			
			<CompLine icon={'IconLogout'} onClick={() => {
				toast({ title: 'todo', variant: 'destructive' })
			}}>Log Out</CompLine>
		</div>
	)
}
