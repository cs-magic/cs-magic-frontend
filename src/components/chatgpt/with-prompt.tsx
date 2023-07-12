import { useU } from '@/hooks/use-u'
import { RootLayout } from '@/layouts/RootLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SendInput } from '@/components/chatgpt/send-input'
import { RefObject, useEffect, useState } from 'react'
import { ChatgptRoleType, IChatgptConversation, IChatgptMessage } from '@/ds/openai/chatgpt'
import { useUser } from '@/hooks/use-user'
import { useListChatgptMessagesQuery } from '@/states/api/chatgptApi'
import { toast } from '@/hooks/use-toast'
import { io, Socket } from 'socket.io-client'
import { IClientSocketMessage, IServerSocketMessage, SocketActionType } from '@/ds/socket'
import { ChatMessage, ContentStatus, RichContentType } from '@/components/chatgpt/ChatMessage'
import { NEXT_PUBLIC_SOCKET_SERVER } from '@/lib/env'
import { PlatformType } from '@/ds/openai'
import { MessageType } from '@/ds/general'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

let socket: Socket


export const ChatgptWithPrompt = ({ prompt }: { prompt: IChatgptConversation }) => {
	const u = useU()
	const user = useUser()
	
	const { data: initMessages = [] } = useListChatgptMessagesQuery(prompt.id)
	const [messages, setMessages] = useState<IChatgptMessage[]>(initMessages)
	
	console.log({ messages })
	
	useEffect(() => {
		
		socket = io(NEXT_PUBLIC_SOCKET_SERVER as string, {
			path: '/ws/socket.io/', // warn: 这里不能变，否则服务器就要变，以及nginx等
			transports: ['websocket', 'polling'],
		})
		
		socket.on('connect', () => { console.log('Connected: ', socket.id) })
		socket.on('message', (data: IServerSocketMessage) => {
			console.log('REC: ', data)
			if (data.type === 'response') {
				setMessages((messages) => [...messages, {
					content: data.msg,
					
					sender: 'openai',
					platform_params: {
						role: ChatgptRoleType.assistant,
					},
					
					type: MessageType.text,
					platform_type: PlatformType.chatGPT,
					time: new Date(),
					status: 'OK',
					conversation_id: prompt.id,
				}])
			}
		})
		
		const msg: IClientSocketMessage = {
			action: SocketActionType.join_room,
			args: {},
			room_id: prompt.id,
			user_id: user?.id,
		}
		socket.send(msg)
	}, [])
	
	const onSubmit = async (ref: RefObject<HTMLTextAreaElement>) => {
		const content = ref.current!.value
		if (!user?.id) return toast({ title: '需要先登录才能发送消息哦~', variant: 'destructive' })
		if (!socket) return toast({ title: '聊天服务器尚未初始化~', variant: 'destructive' })
		
		// todo: 合并两类message
		let msg: IChatgptMessage = {
			conversation_id: prompt.id,
			content,
			type: MessageType.text,
			platform_type: PlatformType.chatGPT,
			platform_params: { role: ChatgptRoleType.user },
			sender: user.id,
			time: new Date(),
		}
		const socketMessage: IClientSocketMessage = {
			action: SocketActionType.call_chatgpt,
			args: {
				content,
			},
			room_id: prompt.id,
			user_id: user.id,
		}
		await socket.send(socketMessage)
		setMessages([...messages, msg])
		
		ref.current!.value = ''
	}
	
	return (
		<RootLayout title={u.routers.apps.chat.chatGPT}>
			
			<div className={'w-full grow flex flex-col gap-4 overflow-hidden'}>
				
				<Card>
					<CardHeader>
						<CardTitle>{prompt.name}</CardTitle>
					</CardHeader>
					
					<CardContent>
						{prompt.platform_params.system_prompt}
					</CardContent>
				</Card>
				
				
				<div id={'messages'} className={'w-full grow overflow-auto flex flex-col gap-2'}>
					{/*{[...Array(10)].map((value, index, array) => (*/}
					{/*	<ChatMessage*/}
					{/*		key={index}*/}
					{/*		side={'left'}*/}
					{/*		userId={USER_OPENAI.id}*/}
					{/*		richContent={{*/}
					{/*			type: RichContentType.text,*/}
					{/*			content: 'test',*/}
					{/*		}}*/}
					{/*		status={ContentStatus.delivered}*/}
					{/*		time={new Date()}*/}
					{/*	/>*/}
					{/*))}*/}
					
					{messages.map((message, index) => {
						return (
							<ChatMessage
								key={index}
								side={message.sender === user?.id ? 'right' : 'left'}
								userId={message.sender}
								richContent={{
									type: RichContentType.text,
									content: message.content,
								}}
								status={ContentStatus.delivered}
								time={message.time}
							/>
						)
					})}
				</div>
				
				<SendInput handleSubmit={onSubmit} extraButtonsOnMobile={(
					<Sheet>
						<SheetTrigger asChild>
							<Button size={'sm'} className={'rounded-none'}>{u.ui.chat.btn.conversations}</Button>
						</SheetTrigger>
						<SheetContent className={'w-1/2 p-0 pt-10'} position={'left'}>
							{/*{conversationsComp}*/}
						</SheetContent>
					</Sheet>
				)}/>
			
			
			</div>
		
		</RootLayout>
	)
}
export default ChatgptWithPrompt
