import { useU } from '@/hooks/use-u'
import { RootLayout } from '@/components/layouts/RootLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SendInput } from '@/components/chatgpt/send-input'
import { RefObject, useEffect, useState } from 'react'
import { ChatgptRoleType, IChatgptPromptWeb } from '@/ds/openai/chatgpt'
import { useUserId } from '@/hooks/use-user'
import { useListChatgptMessagesQuery, useSendMessageMutation } from '@/states/api/chatgptApi'
import { PlatformType } from '@/ds/openai/general'
import { IChatgptMessage, MessageType } from '@/ds/openai/message'
import { toast } from '@/hooks/use-toast'
import { io } from 'socket.io-client'

export const ChatgptWithPrompt = ({ prompt }: { prompt: IChatgptPromptWeb }) => {
	
	
	const u = useU()
	const userId = useUserId()
	
	const { data: initMessages = [] } = useListChatgptMessagesQuery(prompt.id)
	const [messages, setMessages] = useState(initMessages)
	const [sendMessage] = useSendMessageMutation()
	
	console.log({ messages })
	
	const onSubmit = async (ref: RefObject<HTMLTextAreaElement>) => {
		const content = ref.current!.value
		if (!userId) return toast({ title: '需要先登录才能发送消息哦~', variant: 'destructive' })
		
		let msg: IChatgptMessage = {
			conversation_id: prompt.id,
			content,
			type: MessageType.text,
			platform_type: PlatformType.chatGPT,
			platform_params: { role: ChatgptRoleType.user },
			sender: userId,
		}
		await sendMessage(msg)
		setMessages([...messages, msg])
		
		ref.current!.value = ''
	}
	
	useEffect(() => {
		const socket = io('ws://localhost:2001', {
			path: '/ws/socket.io/',
			transports: ['websocket', 'polling'],
		})
		
		socket.on('connect', () => { console.log('Connected', socket.id) })
		socket.on('response', () => { console.log('Response', socket.id) })
		socket.on('message', data => { console.log(data) })
		
		socket.send({ room_id: prompt.id, action: 'ping' })
		socket.send({ room_id: prompt.id, action: 'again' })
	}, [])
	
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
				
				<div id={'messages'} className={'w-full grow flex flex-col gap-2'}>
					{messages.map((message, index) => {
						return (
							<div key={index}>
								{message.content}
							</div>
						)
					})}
				</div>
				
				<SendInput handleSubmit={onSubmit}/>
			
			
			</div>
		
		</RootLayout>
	)
}
export default ChatgptWithPrompt
