import { RootLayout } from '@/components/layouts/RootLayout'
import { ReactNode, useRef } from 'react'
import { CompSidebar } from '@/components/shared/CompSidebar'
import { IConversation } from '@/ds/conversation'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import api from '@/lib/api'

export const genNewConversation = async (client_id: string): Promise<string> => {
	// post with query, ref: https://stackoverflow.com/a/53501339
	const res = await api.post('/openai/chatgpt/reverse/new', null, {
		params: {
			client_id,
		},
	})
	return res.data
}

export const ChatLayout = ({ conversations, children }: {
	conversations: IConversation[],
	children: ReactNode
}) => {
	
	return (
		<RootLayout title={'免翻 ChatGPT PLUS'}>
			<div className={'flex w-full h-full'}>
				<CompSidebar conversations={conversations}/>
				
				<div className={'flex-1 flex flex-col p-2'}>
					{children}
				</div>
			</div>
		</RootLayout>
	)
}
