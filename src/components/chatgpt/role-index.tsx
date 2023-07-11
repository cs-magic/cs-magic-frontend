import { useU } from '@/hooks/use-u'
import { useState } from 'react'
import { IChatgptRole } from '@/ds/openai/chatgpt'
import { CHATGPT_ROLE_ACT_DEFAULT, CHATGPT_ROLE_PROMPT_DEFAULT } from '@/settings'
import systemRoles from '@/data/openai/chatgpt/prompts.json'
import { RootLayout } from '@/components/layouts/RootLayout'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export const ChatgptNoRole = () => {
	
	const u = useU()
	const [search, setSearch] = useState('')
	const [role, setRole] = useState<IChatgptRole>({
		act: CHATGPT_ROLE_ACT_DEFAULT,
		prompt: CHATGPT_ROLE_PROMPT_DEFAULT,
	})
	const roles = systemRoles.filter((role) => {
		// if (!search) return true
		if (role.act.includes(search) || role.prompt.includes(search)) return true
		return false
	})
	
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
						{
							role.act === CHATGPT_ROLE_ACT_DEFAULT && (
								<div className={'flex flex-wrap gap-8 justify-between '}>
									{
										roles.map((role) => {
											return (
												<Link href={`?act=${role.act}`} key={role.act}>
													<Card key={role.act} className={'w-[320px] cursor-pointer hover:shadow-md hover:shadow-indigo-500'}>
														<CardHeader>
															<CardTitle>{role.act}</CardTitle>
														</CardHeader>
														
														<CardContent className={'h-[80px] overflow-auto'}>
															{role.prompt}
														</CardContent>
													</Card>
												</Link>
											)
										})
									}
								</div>
							)
						}
					</CardContent>
				</Card>
			</div>
		
		</RootLayout>
	)
}
export default ChatgptNoRole
