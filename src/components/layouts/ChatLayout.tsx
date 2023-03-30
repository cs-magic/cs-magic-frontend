import { RootLayout } from '@/components/layouts/RootLayout'
import { ReactNode, useRef } from 'react'
import { CompSidebar } from '@/components/shared/CompSidebar'
import { IConversation } from '@/ds/conversation'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export const ChatLayout = ({ conversations, children }: {
	conversations: IConversation[],
	children: ReactNode
}) => {
	
	const refMessage = useRef<HTMLTextAreaElement | null>(null)
	
	const onSubmit = () => {
		console.log('sending message:', refMessage.current!.value)
		refMessage.current!.value = ''
	}
	
	return (
		<RootLayout>
			<div className={'flex w-full h-full'}>
				<CompSidebar conversations={conversations}/>
				
				<div className={'flex-1 flex flex-col p-2'}>
					<div className={'w-full flex-1'}>
						{children}
					</div>
					
					<div className="grid w-full gap-2">
						<Textarea ref={refMessage} placeholder="Type your message here."/>
						<Button type={'button'} onClick={onSubmit}>Send</Button>
					</div>
				</div>
			</div>
		</RootLayout>
	)
}
