import { useRouter } from 'next/router'
import { ensureSole } from '@/lib/utils'
import { RootLayout } from '@/components/layouts/RootLayout'
import { ConversationsComp } from '@/components/conversation/ConversationsComp'
import { MessagesComp } from '@/components/conversation/MessagesComp'
import { useUserId } from '@/hooks/use-user'
import { PlatformType } from '@/ds/openai/general'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'

export const ConversationPage = () => {
	const u = useAppSelector(selectU)
	
	// customize
	const platformType: PlatformType = PlatformType.chatGPT
	const title = u.routes.apps.chatGPT
	
	// preserve
	const router = useRouter()
	const cid = ensureSole(router.query.cid) // router id or null
	
	const conversationsComp = <ConversationsComp
		cid={cid}
		platform_type={platformType}
	/>
	
	
	return (
		<RootLayout title={title}>
			<div className={'w-full grow flex'}>
				
				{/* left: conversations */}
				<div className={'hidden md:block w-[260px] items-stretch'}>
					{conversationsComp}
				</div>
				
				{/* right: current conversation */}
				<MessagesComp
					cid={cid}
					platform_type={platformType}
					conversationsComp={conversationsComp}
				/>
			
			</div>
		</RootLayout>
	)
}

export default ConversationPage

