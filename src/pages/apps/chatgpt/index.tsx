import ChatgptWithoutPrompt from '@/components/chatgpt/without-prompt'
import ChatgptWithPrompt from '@/components/chatgpt/with-prompt'
import { ID } from '@/ds/general'
import { useRouter } from 'next/router'
import { useListChatgptPromptsQuery } from '@/states/api/chatgptApi'
import { CentralLoadingComp } from '@/components/general/CentralLoadingComp'

export const ChatgptPromptPage = () => {
	const router = useRouter()
	const id = router.query.id as ID | undefined
	const { data: prompts } = useListChatgptPromptsQuery(id)
	
	console.log({ id, prompts })
	
	if (prompts === undefined) return <CentralLoadingComp/>
	
	if (!id) return <ChatgptWithoutPrompt/>
	
	if (prompts.length === 0) {
		router.push('/apps/chatgpt')
		return null
	}
	
	return <ChatgptWithPrompt prompt={prompts[0]}/>
}

export default ChatgptPromptPage


