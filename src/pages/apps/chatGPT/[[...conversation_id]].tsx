import { useRouter } from 'next/router'
import { ensureSole } from '@/lib/utils'
import { RootLayout } from '@/layouts/RootLayout'
import { ConversationsComp } from '@/components/shared/ConversationsComp'
import { ConversationComp } from '@/components/shared/ConversationComp'
import { u } from '@/config'
import { useUserId } from '@/hooks/use-user'
import { CentralLoadingComp } from '@/components/views/CentralLoadingComp'
import { ModelPlatformType } from '@/ds/message'

export const ConversationPage = () => {
	
	const router = useRouter()
	const user_id = useUserId()
	const conversation_id = ensureSole(router.query.conversation_id || null)
	
	return (
		<RootLayout title={u.routes.service.chatGPT}>
			{
				!user_id ? <CentralLoadingComp/> : (
					<div className={'w-full h-full flex'}>
						
						{/* left: conversations */}
						<div className={'hidden md:block w-[260px]'}>
							<ConversationsComp conversation_id={conversation_id} model_platform={ModelPlatformType.chatgpt}/>
						</div>
						
						{/* right: current conversation */}
						<ConversationComp conversation_id={conversation_id} model_platform={ModelPlatformType.chatgpt}/>
					
					</div>
				)
			}
		</RootLayout>
	)
}

export default ConversationPage
