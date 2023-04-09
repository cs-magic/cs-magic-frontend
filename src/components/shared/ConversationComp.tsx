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
import { Button } from '@/components/ui/button'

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
	
	const c = 'text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl md:py-6 flex m-auto'
	
	useEffect(() => {
		refMessageEnd.current!.scrollIntoView({ behavior: 'smooth' })
	}, [messages.length])
	
	return (
		<div className={'flex-1 flex flex-col h-full'}>
			<div className={'w-full h-12 flex justify-center items-center bg-bg-sub font-semibold'}>Model: {model}</div>
			
			<div className={clsx(
				'grow overflow-auto flex flex-col justify-end'
			)}>
				{
					messages.map((msg, index) => (
						<div key={index} className={clsx(
							'w-full',
							msg.role === ChatgptRoleType.assistant ? 'bg-gray-50 dark:bg-[#444654]' : 'dark:bg-gray-800',
						)}>
							{/*// 这里直接copy的chatgpt居中的css*/}
							<div className={clsx(
								c,
								'p-4'
							)}>
								
								{
									msg.role === ChatgptRoleType.assistant
										? <IconBrandOpenai size={24} className={'shrink-0'}/>
										: <AvatarView user={userBasic} className={'w-6 h-6'}/>
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
				<div className={clsx(c, 'relative p-0')}>
					<Textarea
						className={'w-full shadow-xl'}
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								if (!event.metaKey && !event.shiftKey && !event.ctrlKey) {
									onSubmit()
									event.preventDefault() // prevent enter go down
								}
							}
						}}
						ref={refMessageSend}
						placeholder="Type your message here."
					/>
					<IconBrandTelegram className={'hidden md:block absolute right-3 bottom-8 cursor-pointer'} onClick={onSubmit}/>
				</div>
					<Button className={'md:hidden w-full mt-2'} size={'sm'} onClick={onSubmit}>Send</Button>
			</div>
		</div>
	)
}
