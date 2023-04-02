import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { selectConversations } from '@/states/features/conversations'
import { ScrollArea } from '@/components/ui/scroll-area'
import * as allIcons from '@tabler/icons-react'
import { IconLogout, IconMessageCircle, IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import { ReactNode, useEffect } from 'react'
import { Separator } from '../ui/separator'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { fetchConversations } from '@/states/thunks/chat'
import { useSelector } from 'react-redux'
import { selectUserID } from '@/states/features/user'

const CompLine = ({ icon, children }: { icon: string, children: ReactNode }) => {
	// ref: https://stackoverflow.com/a/73846364
	// @ts-ignore
	const Icon = allIcons[icon]
	return (
		<div className={'w-full p-3 truncate inline-flex items-center gap-2 hover:bg-[#2A2B32]'}>
			<Icon size={16}/>
			{children}
		</div>
	)
}

export const CompConversations = ({}) => {
	
	const user_id = useSelector(selectUserID)
	
	const dispatch = useAppDispatch()
	
	useEffect(() => {
		if (user_id) dispatch(fetchConversations(user_id))
	}, [user_id])
	
	
	const conversations = useAppSelector(selectConversations)
	
	return (
		<div className={'dark hidden bg-gray-900 text-gray-100 md:flex md:w-[260px] md:flex-col'}>
			
			<Button className={'w-full inline-flex items-center gap-2'} variant={'subtle'}>
				<IconPlus size={16}/>New Chat
			</Button>
			
			<ScrollArea className={'flex-1'}>
				{
					conversations.map((conversation) => (
						<CompLine icon={'IconMessageCircle'} key={conversation.id}>
							<Link href={`/chat/${conversation.id}`}>
								{conversation.name || conversation.id}
							</Link>
						</CompLine>
					))
				}
			</ScrollArea>
			
			<Separator/>
			<CompLine icon={'IconLogout'}>Log Out</CompLine>
		</div>
	)
}
