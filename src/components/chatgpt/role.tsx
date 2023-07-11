import { useU } from '@/hooks/use-u'
import { IChatgptRolePage } from '@/ds/openai/chatgpt'
import { RootLayout } from '@/components/layouts/RootLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const ChatgptRole = (props: IChatgptRolePage) => {
	
	const u = useU()
	
	return (
		<RootLayout title={u.routers.apps.chat.chatGPT}>
			
			<div className={'w-full h-full flex flex-col gap-4 overflow-hidden'}>
				
				<Card>
					<CardHeader>
						<CardTitle>{props.act}</CardTitle>
					</CardHeader>
					
					<CardContent>
						todo: add description
					</CardContent>
				</Card>
			
			</div>
		
		</RootLayout>
	)
}
export default ChatgptRole
