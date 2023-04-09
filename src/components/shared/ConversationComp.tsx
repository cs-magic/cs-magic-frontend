import { clsx } from 'clsx'
import { ChatgptRoleType } from '@/ds/chatgpt_v2'
import { IconBrandOpenai, IconBrandTelegram } from '@tabler/icons-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { selectChatgptModelType } from '@/states/features/conversationSlice'
import { selectChatgptMessages } from '@/states/features/messageSlice'
import { selectUserId } from '@/states/features/userSlice'
import { asyncSendMessage } from '@/states/thunks/chatgpt'
import { useRef } from 'react'
import { useToast } from '@/hooks/use-toast'

export const ConversationComp = () => {
	const dispatch = useAppDispatch()
	const refMessageSend = useRef<HTMLTextAreaElement | null>(null)
	const refMessageEnd = useRef<HTMLDivElement | null>(null)
	const { toast } = useToast()
	
	const user_id = useAppSelector(selectUserId)
	const model = useAppSelector(selectChatgptModelType)
	const messages = useAppSelector(selectChatgptMessages)
	
	const onSubmit = async () => {
		const res = await dispatch(asyncSendMessage(refMessageSend.current!.value))
		refMessageSend.current!.value = ''
		if (res.meta.requestStatus === 'rejected') {
			toast({ variant: 'destructive', title: res.payload as string, duration: 3000 })
		}
	}
	
	const c = 'text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto'
	
	return (
		<div className={'flex-1 flex flex-col h-full'}>
			<div className={'w-full h-12 flex justify-center items-center bg-bg-sub font-semibold'}>Model: {model}</div>
			
			<div className={'grow overflow-auto'}>
				{
					messages.map((msg, index) => (
						<div key={index} className={clsx(
							'w-full',
							msg.role === ChatgptRoleType.assistant ? 'bg-gray-50 dark:bg-[#444654]' : 'dark:bg-gray-800',
						)}>
							{/*// 这里直接copy的chatgpt居中的css*/}
							<div className={clsx(c)}>
								
								{
									msg.role === ChatgptRoleType.assistant
										? <IconBrandOpenai size={24} className={'shrink-0'}/>
										: (
											<Avatar className={'w-6 h-6 shrink-0'}>
												<AvatarFallback>
													{user_id ? user_id[0] : 'U'}
												</AvatarFallback>
											</Avatar>
										)
								}
								
								{msg.content}
							</div>
						</div>
					))
				}
				<div ref={refMessageEnd}/>
			</div>
			
			<div className={'w-full'}>
				<div className={clsx(c, 'relative')}>
					<Textarea
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								if (!event.metaKey && !event.shiftKey && !event.ctrlKey) {
									onSubmit()
									refMessageEnd.current!.scrollIntoView({ behavior: 'smooth' })
									event.preventDefault() // prevent enter go down
								}
							}
						}}
						className={'w-full shadow-xl'}
						ref={refMessageSend}
						placeholder="Type your message here."
					/>
					<IconBrandTelegram className={'absolute right-3 bottom-8 cursor-pointer'} onClick={onSubmit}/>
				</div>
			</div>
		</div>
	)
}
