import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/states/hooks'
import { selectConversations } from '@/states/features/conversations'
import { ScrollArea } from '@/components/ui/scroll-area'
import { IconMessageCircle, IconPlus } from '@tabler/icons-react'
import Link from 'next/link'

export const CompConversations = ({}) => {
	const conversations = useAppSelector(selectConversations)
	
	return (
		<div className={'dark hidden bg-gray-900 text-gray-100 md:flex md:w-[260px] md:flex-col'}>
			
			<Button className={'w-full inline-flex items-center gap-2'} variant={'subtle'}>
				<IconPlus size={16}/>New Chat
			</Button>
			
			<ScrollArea>
				{
					conversations.map((conversation) => (
						<Link href={`/chat/${conversation.id}`} key={conversation.id}
						      className={'w-full p-3 truncate inline-flex items-center gap-2 hover:bg-[#2A2B32]'}
						>
							<IconMessageCircle size={16}/>
							{conversation.name || conversation.id}
						</Link>
					))
				}
			</ScrollArea>
			
		</div>
	)
}
