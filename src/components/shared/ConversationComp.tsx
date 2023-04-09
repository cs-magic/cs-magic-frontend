import { clsx } from 'clsx'
import { ChatgptRoleType } from '@/ds/chatgpt_v2'
import { IconBrandOpenai, IconBrandTelegram } from '@tabler/icons-react'
import { Textarea } from '@/components/ui/textarea'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { selectChatgptModelType } from '@/states/features/conversationSlice'
import { selectChatgptMessages } from '@/states/features/messageSlice'
import { selectUserBasic } from '@/states/features/userSlice'
import { asyncSendMessage } from '@/states/thunks/chatgpt'
import { useEffect, useRef, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { AvatarView } from '@/components/views/AvatarView'

export const ConversationComp = () => {
	const dispatch = useAppDispatch()
	const refMessageSend = useRef<HTMLTextAreaElement | null>(null)
	const refMessageEnd = useRef<HTMLDivElement | null>(null)
	const { toast } = useToast()
	
	const userBasic = useAppSelector(selectUserBasic)
	const model = useAppSelector(selectChatgptModelType)
	const messages = useAppSelector(selectChatgptMessages)
	
	const [waiting, setWaiting] = useState(false)
	
	const onSubmit = async () => {
		setWaiting(true)
		const content = refMessageSend.current!.value
		refMessageSend.current!.value = ''
		const res = await dispatch(asyncSendMessage(content))
		if (res.meta.requestStatus === 'rejected') {
			toast({ variant: 'destructive', title: res.payload as string, duration: 3000 })
		}
		setWaiting(false)
	}
	
	const c = 'text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto'
	
	useEffect(() => {
		refMessageEnd.current!.scrollIntoView({ behavior: 'smooth' })
	}, [messages.length])
	
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
										: <AvatarView user={userBasic}/>
								}
								
								{msg.content}
							</div>
						</div>
					))
				}
				
				{waiting && (
					<div className={'w-full'}>
						<div className={c}>
							<div className={'px-2 inline-flex items-center w-full gap-4'}>
								<p className={'text-sm text-gray-500'}>耐心等待，最近OpenAI调用太多，平均预计需要十秒……</p>
								<progress className="progress flex-1"></progress>
							</div>
						</div>
					</div>
				)}
				
				{/* for scroll */}
				<div ref={refMessageEnd}/>
			</div>
			
			<div className={'w-full'}>
				<div className={clsx(c, 'relative')}>
					<Textarea
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								if (!event.metaKey && !event.shiftKey && !event.ctrlKey) {
									onSubmit()
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
