import { useU } from '@/hooks/use-u'
import { useState } from 'react'
import { RootLayout } from '@/layouts/RootLayout'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useListChatgptPromptsQuery } from '@/states/api/chatgptApi'

export const ChatgptNoRole = () => {
	
	const u = useU()
	const [search, setSearch] = useState('')
	const { data: prompts = [] } = useListChatgptPromptsQuery(undefined)
	const filteredPrompts = prompts.filter((prompt) =>
		!search
		|| prompt.name?.includes(search)
		|| prompt.platform_params.system_prompt?.includes(search)
	)
	
	return (
		<RootLayout title={u.routers.apps.chat.chatGPT}>
			
			<div className={'w-full h-full flex flex-col gap-4 overflow-hidden'}>
				
				<Input placeholder={'你想让 ChatGPT 帮你做什么呢？'}
				       className={'my-[60px] max-w-[640px] mx-auto'}
				       value={search}
				       onChange={(event) => setSearch(event.currentTarget.value)}/>
				
				<Card>
					<CardHeader>
						<CardTitle>Your Favorites</CardTitle>
					</CardHeader>
					
					<CardContent>
						Not Yet one ...
					</CardContent>
				</Card>
				
				<Card>
					<CardHeader>
						<CardTitle>Playgrounds</CardTitle>
					</CardHeader>
					
					<CardContent className={'w-full min-h-[320px] max-h-[360px] overflow-auto'}>
						<div className={'grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-8'}>
							{
								filteredPrompts.map((prompt) => {
									return (
										<Link href={`?id=${prompt.id}`} key={prompt.id}>
											<Card className={'w-[320px] cursor-pointer hover:shadow-md hover:shadow-indigo-500'}>
												<CardHeader>
													<CardTitle>{prompt.name}</CardTitle>
												</CardHeader>
												
												<CardContent className={'h-[80px] overflow-auto'}>
													{prompt.platform_params.system_prompt}
												</CardContent>
											</Card>
										</Link>
									)
								})
							}
						</div>
					</CardContent>
				</Card>
			</div>
		
		</RootLayout>
	)
}
export default ChatgptNoRole
