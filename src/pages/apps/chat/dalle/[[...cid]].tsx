import { useRouter } from 'next/router'
import { ensureSole } from '@/lib/utils'
import { RootLayout } from '@/layouts/RootLayout'
import { ConversationsComp } from '@/components/shared/ConversationsComp'
import { ConversationComp } from '@/components/shared/ConversationComp'
import { u } from '@/config'
import { useUserId } from '@/hooks/use-user'
import { CentralLoadingComp } from '@/components/views/CentralLoadingComp'
import { PlatformType } from '@/ds/openai/general'

export const ConversationPage = () => {
	
	// customize
	const platformType: PlatformType = PlatformType.dalle
	const title = u.routes.service.dalle
	
	// preserve
	const router = useRouter()
	const user_id = useUserId()
	const cid = ensureSole(router.query.conversation_id) // router id or null
	
	const conversationsComp = <ConversationsComp
		cid={cid}
		platform_type={platformType}
	/>
	
	return (
		<RootLayout title={title}>
			{
				!user_id ? <CentralLoadingComp/> : (
					<div className={'w-full h-full flex'}>
						
						{/* left: conversations */}
						<div className={'hidden md:block w-[260px]'}>
							{conversationsComp}
						</div>
						
						{/* right: current conversation */}
						<ConversationComp
							cid={cid}
							platform_type={platformType}
							conversationsComp={conversationsComp}
						/>
					
					</div>
				)
			}
		</RootLayout>
	)
}

export default ConversationPage

