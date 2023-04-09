import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { asyncSetConversationID } from '@/states/thunks/chatgpt'
import { ensureSole } from '@/lib/utils'
import { RootLayout } from '@/components/layouts/RootLayout'
import { ConversationsComp } from '@/components/shared/ConversationsComp'
import { ConversationComp } from '@/components/shared/ConversationComp'
import { selectUserId } from '@/states/features/userSlice'


export const ConversationPage = () => {
	const dispatch = useAppDispatch()
	
	const router = useRouter()
	const router_conversation_id = ensureSole(router.query.conversation_id || null)
	
	const user_id = useAppSelector(selectUserId)
	
	useEffect(() => {
		if (!user_id) return
		// 需要有 user_id 才可以触发
		dispatch(asyncSetConversationID(router_conversation_id))
	}, [user_id, router_conversation_id])
	
	return (
		<RootLayout title={'免翻 ChatGPT PLUS'}>
			<div className={'flex w-full grow overflow-auto'}>
				
				{/* left: conversations */}
				<ConversationsComp/>
				
				{/* right: current conversation */}
				<ConversationComp/>
			
			</div>
		</RootLayout>
	)
}

export default ConversationPage
