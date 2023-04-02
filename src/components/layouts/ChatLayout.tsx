import { RootLayout } from '@/components/layouts/RootLayout'
import { ReactNode, useEffect, useRef } from 'react'
import { CompConversations } from '@/components/shared/CompConversations'
import { IChatbotConversation } from '@/ds/chatgpt'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import api from '@/lib/api'
import { useAppSelector } from '@/states/hooks'
import { selectUserID } from '@/states/features/user'

export const genNewConversation = async (client_id: string): Promise<string> => {
	// post with query, ref: https://stackoverflow.com/a/53501339
	const res = await api.post('/openai/chatgpt/reverse/new', null, {
		params: {
			client_id,
		},
	})
	return res.data
}

export const ChatLayout = ({ children }: {
	children: ReactNode
}) => {
	
	return (
		<RootLayout title={'免翻 ChatGPT PLUS'}>
			<div className={'flex w-full flex-1'}>
				<CompConversations/>
				
				<div className={'flex-1 flex flex-col'}>
						{children}
				</div>
			</div>
		</RootLayout>
	)
}
