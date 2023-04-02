import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/states/hooks'
import { selectConversations } from '@/states/features/conversations'
import { ScrollArea } from '@/components/ui/scroll-area'
import { IconMessageCircle, IconPlus } from '@tabler/icons-react'
import Link from 'next/link'

export const CompConversations = ({}) => {
	const conversations = useAppSelector(selectConversations)
	
	return (
		<div className={'hidden md:block w-[240px] bg-bg-shade flex flex-col p-2 gap-2'}>
			
			<Button className={'w-full inline-flex items-center gap-2'} variant={'subtle'}>
				<IconPlus size={16}/>New Chat</Button>
			<ScrollArea>
				{
					conversations.map((conversation) => (
						<Link href={`/chat/${conversation.id}`} key={conversation.id} className={'truncate inline-flex items-center gap-2 h-8'}>
							<IconMessageCircle size={16}/>
							{conversation.name || conversation.id}
						</Link>
					))
				}
			</ScrollArea>
		</div>
	)
}
