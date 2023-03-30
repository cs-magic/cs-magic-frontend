import { RootLayout } from '@/comps/layouts/RootLayout'
import { ReactNode } from 'react'

export const ChatLayout = ({ conversations, children }: {
	conversations: string[],
	children: ReactNode
}) => {
	return (
		<RootLayout>
			<div className={'flex w-full h-full'}>
				<div className={'hidden md:block w-[240px] bg-bg-shade'}>
					
					<div>Conversations</div>
					{
						conversations.map((conversation) => (
							<div key={conversation}>{conversation}</div>
						))
					}
				</div>
				
				<div className={'flex-1'}>
					{children}
				</div>
			</div>
		</RootLayout>
	)
}
