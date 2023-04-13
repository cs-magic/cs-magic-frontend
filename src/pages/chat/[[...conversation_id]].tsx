import { useRouter } from 'next/router'
import { ensureSole } from '@/lib/utils'
import { RootLayout } from '@/layouts/RootLayout'
import { ConversationsComp } from '@/components/shared/ConversationsComp'
import { ConversationComp } from '@/components/shared/ConversationComp'
import { u } from '@/config'
import { useUserId } from '@/hooks/use-user'
import { useListConversationsQuery, useListMessagesQuery } from '@/states/apis/openai/chatgptApi'
import { skipToken } from '@reduxjs/toolkit/query'
import { CentralLoadingComp } from '@/components/views/CentralLoadingComp'

export const ConversationPage = () => {
	
	const router = useRouter()
	const user_id = useUserId()
	const conversation_id = ensureSole(router.query.conversation_id || null)
	const { data: conversations = [], isLoading: isLoadingConversations } = useListConversationsQuery(user_id ?? skipToken)
	const { data: messages = [], isLoading: isLoadingMessages } = useListMessagesQuery(conversation_id ?? skipToken)
	
	

	
	return (
		<RootLayout title={u.routes.service.chatgpt}>
			{
				!user_id || isLoadingConversations ? <CentralLoadingComp/> : (
					<div className={'w-full h-full flex'}>
						
						{/* left: conversations */}
						<div className={'hidden md:block w-[260px]'}>
							<ConversationsComp conversation_id={conversation_id} conversations={conversations}/>
						</div>
						
						{/* right: current conversation */}
						{
							isLoadingMessages ? <CentralLoadingComp/> :
								<ConversationComp conversations={conversations} conversation_id={conversation_id} initMessages={messages}/>
						}
					
					</div>
				)
			}
		</RootLayout>
	)
}

export default ConversationPage
