import { IconPlus } from '@tabler/icons-react'
import { clsx } from 'clsx'
import { ID } from '@/ds/general'
import { skipToken } from '@reduxjs/toolkit/query'
import { useUserId } from '@/hooks/use-user'
import { CentralLoadingComp } from '@/components/general/CentralLoadingComp'
import { getChatLink } from '@/lib/utils'
import Link from 'next/link'
import { ConversationLineComp } from './ConversationLineComp'
import { Button } from '@/components/ui/button'
import { useListConversationsQuery } from '@/states/api/chatgptApi'
import { PlatformType } from '@/ds/openai'
import { IChatgptConversation } from '@/ds/openai/chatgpt'

export const ConversationsComp = ({ cid }: { cid: ID | null }) => {
	
	const user_id = useUserId()
	
	const { data: conversations = [], isLoading } =
		useListConversationsQuery(user_id ? { user_id, platform_type: PlatformType.chatGPT } : skipToken)
	
	
	return (
		<div className={'w-full h-full flex flex-col border-r border-base-300 overflow-auto'}>
			
			{
				isLoading ? <CentralLoadingComp/> : (
					<>
						<Link href={getChatLink({ platform_type: PlatformType.chatGPT })}>
							<Button className={'w-full rounded-none'} size={'sm'} variant={'outline'}>
								<IconPlus size={16}/>
								<p>New Chat</p>
							</Button>
						</Link>
						
						<div className={clsx(
							'w-full flex',
							// 'flex-col',
							' flex-col-reverse', // 倒序展示
						)}>
							{
								conversations.map((conversation: IChatgptConversation) =>
									<ConversationLineComp
										key={conversation.id}
										conversation={conversation}
										isHighlight={cid === conversation.id}
									/>)
							}
						</div>
						
						<div className={'grow hidden md:block'}/>
					</>
				)
			}
		</div>
	)
}
