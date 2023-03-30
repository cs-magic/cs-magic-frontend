import { RootLayout } from '@/components/layouts/RootLayout'
import { ReactNode } from 'react'
import { CompSidebar } from '@/components/shared/CompSidebar'
import { IConversation } from '@/ds/conversation'

export const ChatLayout = ({ conversations, children }: {
	conversations: IConversation[],
	children: ReactNode
}) => {
	return (
		<RootLayout>
			<div className={'flex w-full h-full'}>
				<CompSidebar conversations={conversations}/>
				
				<div className={'flex-1'}>
					{children}
				</div>
			</div>
		</RootLayout>
	)
}
