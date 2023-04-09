import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { asyncSetConversationID } from '@/states/thunks/chatgpt'
import { ensureSole } from '@/lib/utils'
import { RootLayout } from '@/layouts/RootLayout'
import { ConversationsComp } from '@/components/shared/ConversationsComp'
import { ConversationComp } from '@/components/shared/ConversationComp'
import { selectUserId } from '@/states/features/userSlice'
import { IconRotateClockwise2 } from '@tabler/icons-react'
import { clsx } from 'clsx'


export const ConversationPage = () => {
	const dispatch = useAppDispatch()
	
	const router = useRouter()
	const router_conversation_id = ensureSole(router.query.conversation_id || null)
	
	const user_id = useAppSelector(selectUserId)
	const [loading, setLoading] = useState(true)
	
	useEffect(() => {
		if (!user_id) return
		// 需要有 user_id 才可以触发
		setLoading(true)
		dispatch(asyncSetConversationID(router_conversation_id))
		setLoading(false)
	}, [user_id, router_conversation_id])
	
	return (
		<RootLayout title={'免翻 ChatGPT PLUS'}>
			<div className={clsx(
				'flex w-full overflow-auto',
				'grow'
			)}>
				
				{/* left: conversations */}
				<ConversationsComp/>
				
				{/* right: current conversation */}
				{loading ? (
					<div className={'flex-1 h-full flex justify-center items-center'}>
						<IconRotateClockwise2 className={'animate-spin'}/>
					</div>
				) : <ConversationComp/>}
			
			</div>
		</RootLayout>
	)
}

export default ConversationPage
