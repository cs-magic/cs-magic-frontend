import { useRouter } from 'next/router'
import { ensureSole } from '@/lib/utils'
import { RootLayout } from '@/layouts/RootLayout'
import { ConversationsComp } from '@/components/chatgpt/ConversationsComp'
import { MessagesComp } from '@/components/chatgpt/MessagesComp'
import { useU } from '@/hooks/use-u'
import { PlatformType } from '@/ds/openai'

export const ConversationPage = () => {
	const u = useU()
	
	// customize
	const platformType: PlatformType = PlatformType.chatGPT
	
	// preserve
	const router = useRouter()
	const cid = ensureSole(router.query.cid) // router id or null
	
	const conversationsComp = <ConversationsComp
		cid={cid}
		platform_type={platformType}
	/>
	
	
	return (
		<RootLayout title={u.routers.apps.chat.chatGPT}>
			<div className={'w-full grow flex overflow-auto'}>
				
				{/* left: conversations */}
				<div className={'hidden md:block w-[260px] items-stretch overflow-auto shrink-0'}>
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

