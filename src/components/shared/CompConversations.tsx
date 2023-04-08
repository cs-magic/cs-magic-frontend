import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { selectConversations } from '@/states/features/conversationSlice'
import { ScrollArea } from '@/components/ui/scroll-area'
import * as allIcons from '@tabler/icons-react'
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

const CompLine = ({ icon, children, onClick }: { icon: string, children: ReactNode, onClick?: any }) => {
	// ref: https://stackoverflow.com/a/73846364
	// @ts-ignore
	const Icon = allIcons[icon]
	return (
		<div className={'w-full p-3 truncate inline-flex items-center gap-2 hover:bg-[#2A2B32] cursor-pointer'} onClick={onClick}>
			<Icon size={16}/>
			{children}
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
			
			<Button className={'w-full inline-flex items-center gap-2'} variant={'subtle'} onClick={() => {
				toast({ title: 'todo', variant: 'destructive' })
			}}>
				<IconPlus size={16}/>New Chat
			</Button>
			
			<ScrollArea className={'flex-1'}>
				{
					conversations.map((conversation) => (
						<Link href={`/chat/${conversation.id}`} key={conversation.id}>
							<CompLine icon={'IconMessageCircle'}>
								{conversation.id}
							</CompLine>
						</Link>
					))
				}
			</ScrollArea>
			
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
