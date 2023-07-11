import { useU } from '@/hooks/use-u'
import { RootLayout } from '@/components/layouts/RootLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SendInput } from '@/components/chatgpt/send-input'
import { RefObject } from 'react'
import { IChatgptPromptWeb } from '@/ds/openai/chatgpt'

export const ChatgptWithPrompt = ({ prompt }: { prompt: IChatgptPromptWeb }) => {
	
	const u = useU()
	
	const onSubmit = (ref: RefObject<HTMLTextAreaElement>) => {
		console.log('value: ', ref.current?.value)
	}
	
	return (
		<RootLayout title={u.routers.apps.chat.chatGPT}>
			
			<div className={'w-full grow flex flex-col gap-4 overflow-hidden'}>
				
				<Card>
					<CardHeader>
						<CardTitle>{prompt.act}</CardTitle>
					</CardHeader>
					
					<CardContent>
						{prompt.prompt}
					</CardContent>
				</Card>
				
				<SendInput handleSubmit={onSubmit}/>
			
			
			</div>
		
		</RootLayout>
	)
}
export default ChatgptWithPrompt
