import { IconPlus } from '@tabler/icons-react'
import { clsx } from 'clsx'
import { ID } from '@/ds/general'
import { skipToken } from '@reduxjs/toolkit/query'
import { useUserId } from '@/hooks/use-user'
import { CentralLoading } from '@/components/general/CentralLoading'
import { getChatLink } from '@/lib/utils'
import { PlatformType } from '@/ds/openai/general'
import { IConversation } from '@/ds/openai/conversation'
import Link from 'next/link'
import { injectOpenAIConversation } from '@/states/api/conversationApi'
import { ConversationLineComp } from './ConversationLineComp'
import { Button } from '@/components/ui/button'

export const ConversationsComp = <T extends PlatformType>(
	{
		cid,
		platform_type,
	}: {
		cid: ID | null
		platform_type: T
	}) => {
	
	const user_id = useUserId()
	
	const { useListConversationsQuery } = injectOpenAIConversation<T>()
	
	const { data: conversations = [], isLoading: isLoadingConversations } =
		useListConversationsQuery(user_id ? { user_id, platform_type } : skipToken)
	
	
	return (
		<div className={'w-full h-full flex flex-col border-r border-base-300 overflow-auto'}>
			
			{
				isLoadingConversations ? <CentralLoading/> : (
					<>
						<Link href={getChatLink({ platform_type: platform_type })}>
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
								conversations.map((conversation: IConversation<T>) =>
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
