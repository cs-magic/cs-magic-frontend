import { ReactNode, RefObject, useRef, useState } from 'react'
import { MessageComp } from '@/components/chatgpt/MessageComp'
import { ID, MessageStatusType, MessageType } from '@/ds/general'
import { skipToken } from '@reduxjs/toolkit/query'
import { useUser } from '@/hooks/use-user'
import { CentralLoadingComp } from '@/components/general/CentralLoadingComp'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { NEXT_PUBLIC_BACKEND_ENDPOINT } from '@/lib/env'
import { useU } from '@/hooks/use-u'
import { useToast } from '@/hooks/use-toast'
import { ChatgptRoleType, IChatgptMessage } from '@/ds/openai/chatgpt'
import { SendInput } from '@/components/chatgpt/send-input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useGetConversationQuery, useListChatgptMessagesQuery } from '@/states/api/chatgptApi'
import { PlatformType } from '@/ds/openai'
import { MyError } from '@/ds/error'

export const MessagesWithCid = ({ cid, conversationsComp }: { cid: ID, conversationsComp: ReactNode }) => {
	const { toast } = useToast()
	const u = useU()
	
	// user level
	const user = useUser()
	
	// conversation level
	const { data: conversation } = useGetConversationQuery(cid ?? skipToken)
	
	// messages level
	const { data: initedMessages = [], isLoading: isFetchingMessages } = useListChatgptMessagesQuery(cid)
	const [messages, setMessages] = useState<IChatgptMessage[]>(initedMessages)
	
	const refMessageEnd = useRef<HTMLDivElement | null>(null)
	
	const pushMessage = (message: IChatgptMessage) => setMessages((messages) => [...messages, message])
	
	
	const concatMessage = (chunk: string, status: MessageStatusType = 'OK') => {
		const setLastMessage = (func: (msg2: IChatgptMessage) => IChatgptMessage) =>
			setMessages((messages) =>
				[...messages.slice(0, messages.length - 1), func(messages[messages.length - 1])],
			)
		setLastMessage((msg) => ({ ...msg, content: msg.content + chunk, status }))
	}
	
	
	// todo: better auto scroll
	// useEffect(() => refMessageEnd.current?.scrollIntoView({
	// 	behavior: 'smooth',
	// 	block: 'nearest', // inner specific div
	// }), [messages.length && messages[messages.length - 1].content.length])
	
	const fetchSSE = (msg: IChatgptMessage) => {
		console.log(`[fetching SSE] msg: ${msg}`)
		fetchEventSource(`${NEXT_PUBLIC_BACKEND_ENDPOINT}/chatGPT/chat?stream=true`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(msg),
			onopen: async (response) => {
				console.log('onOpen')
				console.log({ response })
				if (!response.ok) {
					const { status } = response
					const { detail } = await response.json()
					console.log({ status, detail })
					// todo: better error design
					concatMessage(detail, status === 402 ? 'ERROR_TOKEN_DRAIN' : 'ERROR')
					throw new MyError(detail)
				}
			},
			onmessage(msg) {
				const { data: chunk } = msg
				// todo: 为空的时候表示换行（后端是正常的，不知道前端这里为啥会变）
				concatMessage(chunk === '' ? '\n' : chunk, 'OK')
			},
			onclose: console.log,
			onerror: err => {throw err},
		})
			.catch(console.error)
	}
	
	
	const onSubmit = async (refInput: RefObject<HTMLTextAreaElement>) => {
		// todo: user match conversation
		if (!user) return toast({ title: '聊天功能需要先登录再使用！', variant: 'destructive' })
		
		const content = refInput.current!.value
		refInput.current!.value = ''
		
		let msg: IChatgptMessage = {
			conversation_id: cid || '',
			content,
			type: MessageType.text,
			platform_type: PlatformType.chatGPT,
			platform_params: { role: ChatgptRoleType.user },
			sender: user.id,
			time: new Date(),
		}
		await pushMessage(msg)
		
		await pushMessage({
			...msg,
			sender: 'openai',
			platform_params: { ...msg.platform_params, role: ChatgptRoleType.assistant },
			type: MessageType.text,
			content: '',
		})
		
		fetchSSE(msg)
	}
	
	
	// 这个加了会闪屏
	// 但是不加的话，在网速差的时候就存在点了没反应的问题
	// 但转念一想，除了用于调试，谁会频繁地切换conversation呢？
	// 所以还是加上吧！
	if (isFetchingMessages) return <CentralLoadingComp/>
	
	
	return (
		<div className={'grow items-stretch overflow-hidden flex flex-col'}>
			<div className={'w-full rounded-none mb-1 flex justify-center items-center font-semibold'}>
				{JSON.stringify(conversation)}
				{/*Model: {conversationParams.}*/}
			</div>
			
			<div className={'w-full grow overflow-auto flex flex-col'}>
				{/* messages */}
				{messages.map((msg, index) => <MessageComp msg={msg} key={index}/>)}
				
				{/* for scroll */}
				<div ref={refMessageEnd} className={'w-full'}/>
			</div>
			
			<SendInput handleSubmit={onSubmit} extraButtonsOnMobile={(
				<Sheet>
					<SheetTrigger asChild>
						<Button size={'sm'} className={'rounded-none'}>{u.ui.chat.btn.conversations}</Button>
					</SheetTrigger>
					<SheetContent className={'w-1/2 p-0 pt-10'} position={'left'}>
						{conversationsComp}
					</SheetContent>
				</Sheet>
			)}/>
		
		</div>
	)
}
