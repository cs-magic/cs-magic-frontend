import { RootLayout } from '@/components/layouts/RootLayout'
import { useCallChatgptMutation } from '@/states/api/testApi'
import { Button } from '@/components/ui/button'
import { ChatgptModelType, ChatgptRoleType, ICallChatgpt } from '@/ds/openai/chatgpt'
import { Loading } from '@/components/general/CentralLoadingComp'

export const TestPage = () => {
	const [callChatgpt, { data: response, isLoading }] = useCallChatgptMutation()
	
	const msg: ICallChatgpt = {
		model: ChatgptModelType.gpt35,
		prompts: [
			{ role: ChatgptRoleType.user, content: 'hello' },
		],
	}
	
	return (
		<RootLayout>
			<Button onClick={() => callChatgpt(msg)}> Send </Button>
			<p>response: {isLoading ? <Loading/> : response}</p>
		</RootLayout>
	)
}

export default TestPage
