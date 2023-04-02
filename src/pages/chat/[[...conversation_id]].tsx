import { ChatLayout } from '@/components/layouts/ChatLayout'
import { useRouter } from 'next/router'
import { CHATGPT_MODEL_35_TURBO, ChatgptModelType, RoleType } from '@/ds/chatgpt'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { selectMessages } from '@/states/features/messages'
import { selectConversations } from '@/states/features/conversations'
import { IconBrandOpenai, IconBrandTelegram } from '@tabler/icons-react'
import { selectUserID } from '@/states/features/user'
import { fetchMessages, sendChat } from '@/states/thunks/chat'
import { ensureSole } from '@/lib/utils'
import { clsx } from 'clsx'
import { CompOpenaiLogo } from '@/components/svg/CompOpenaiLogo'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'


export const ConversationPage = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	
	// should exist user id now
	const user_id = useAppSelector(selectUserID)!
	let conversation_id = ensureSole(router.query.conversation_id)
	
	const conversations = useAppSelector(selectConversations)
	const messages = useAppSelector(selectMessages)
	
	const [model, setModel] = useState<ChatgptModelType>(CHATGPT_MODEL_35_TURBO)
	console.log({ user_id, conversation_id, conversations, messages, model })
	
	const refMessage = useRef<HTMLTextAreaElement | null>(null)
	
	const onSubmit = async () => {
		dispatch(sendChat({ user_id, conversation_id, model, content: refMessage.current!.value }))
		refMessage.current!.value = ''
	}
	
	useEffect(() => {
		dispatch(fetchMessages({ user_id, conversation_id }))
	}, [conversation_id])
	
	const c = 'text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto'
	
	return (
		<ChatLayout>
			<div className={'w-full h-12 flex justify-center items-center bg-bg-sub font-semibold'}>Model: {model}</div>
			<div className={'overflow-auto'}>
				{
					messages.map((msg, index) => (
						<div key={index} className={clsx(
							'w-full',
							msg.role === RoleType.assistant ? 'bg-gray-50 dark:bg-[#444654]' : 'dark:bg-gray-800',
						)}>
							{/*// 这里直接copy的chatgpt居中的css*/}
							<div className={clsx(c)}>
								
								{
									msg.role === RoleType.assistant
										? <IconBrandOpenai size={24} className={'shrink-0'}/>
										: (
											<Avatar className={'w-6 h-6 shrink-0'}>
												<AvatarFallback>
													{user_id[0]}
												</AvatarFallback>
											</Avatar>
										)
								}
								
								{msg.content}
							</div>
						</div>
					))
				}
			</div>
			
			<div className={'w-full'}>
				<div className={clsx(c, 'relative')}>
					<Textarea
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								if (!event.metaKey && !event.shiftKey && !event.ctrlKey) {
									onSubmit()
								}
							}
						}}
						className={'w-full shadow-xl'}
						ref={refMessage}
						placeholder="Type your message here."
					/>
					<IconBrandTelegram className={'absolute right-3 bottom-8 cursor-pointer'} onClick={onSubmit}/>
				</div>
			</div>
		</ChatLayout>
	)
}

export default ConversationPage
