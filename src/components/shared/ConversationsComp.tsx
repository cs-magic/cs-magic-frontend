import { Button } from '@/components/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { ConversationLineComp } from '@/components/shared/ConversationLineComp'
import { FC } from 'react'
import { ID } from '@/ds/general'
import { useListConversationsQuery } from '@/api/openai/chatgptApi'
import { skipToken } from '@reduxjs/toolkit/query'
import { useUserId } from '@/hooks/use-user'
import { CentralLoadingComp } from '@/components/views/CentralLoadingComp'
import { getChatUrl } from '@/lib/utils'
import { ModelPlatformType } from '@/ds/openai'

export const ConversationsComp: FC<{
	conversation_id: ID | null
	model_platform: ModelPlatformType
}> = ({conversation_id, model_platform}) => {
	
	const user_id = useUserId()
	const router = useRouter()
	
	const { data: conversations = [], isLoading: isLoadingConversations } =
		useListConversationsQuery(user_id ? { user_id, model_platform: model_platform } : skipToken)
	
	
	return (
		<div className={'w-full h-full flex flex-col bg-bg-sub'}>
			
			{
				isLoadingConversations ? <CentralLoadingComp/> : (
					<>
						<Button className={'w-full inline-flex items-center gap-2 rounded-none mb-1'} variant={'subtle'} onClick={() => {
							router.push(getChatUrl({model_platform}))
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
									<ConversationLineComp
										key={conversation.id}
										conversation={conversation}
										model_platform={model_platform}
										isHighlight={conversation_id === conversation.id}
									/>)
							}
						</div>
					</>
				)
			}
		
		
		</div>
	)
}
