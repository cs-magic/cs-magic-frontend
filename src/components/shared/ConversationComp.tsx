import { clsx } from 'clsx'
import { IconBrandTelegram } from '@tabler/icons-react'
import { Textarea } from '@/components/ui/textarea'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { selectChatgptModelType } from '@/states/features/conversationSlice'
import { selectChatgptMessages } from '@/states/features/messageSlice'
import { asyncSendMessage } from '@/states/thunks/chatgpt'
import { useEffect, useRef, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { ConversationsComp } from '@/components/shared/ConversationsComp'
import { MessageComp } from '@/components/shared/MessageComp'

export const ConversationComp = () => {
	const dispatch = useAppDispatch()
	const refMessageSend = useRef<HTMLTextAreaElement | null>(null)
	const refMessageEnd = useRef<HTMLDivElement | null>(null)
	const { toast } = useToast()
	
	const model = useAppSelector(selectChatgptModelType)
	const messages = useAppSelector(selectChatgptMessages)
	
	const [waiting, setWaiting] = useState(false)
	
	const onSubmit = async () => {
		setWaiting(true)
		const content = refMessageSend.current!.value
		refMessageSend.current!.value = ''
		const res = await dispatch(asyncSendMessage(content))
		if (res.meta.requestStatus === 'rejected') {
			toast({ variant: 'destructive', title: res.payload as string })
		}
		setWaiting(false)
	}
	
	const c = 'text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex m-auto break-all'
	
	useEffect(() => {
		refMessageEnd.current!.scrollIntoView({ behavior: 'smooth' })
	}, [messages.length])
	
	return (
		<div className={'flex-1 h-full overflow-hidden flex flex-col'}>
			<Button variant={'ghost'} className={'w-full rounded-none mb-1 flex justify-center items-center bg-bg-sub font-semibold'}>Model: {model}</Button>
			
			{/* for stretch, since flex-end cannot combine with overflow-auto */}
			<div className={'grow md:hidden'}/>
			
			<div className={clsx(
				'w-full overflow-auto flex flex-col',
			)}>
				{/* messages */}
				{messages.map((msg, index) => <MessageComp msg={msg} key={index}/>)}
				
				{/* for scroll */}
				<div ref={refMessageEnd} className={'w-full'}/>
			</div>
			
			{/* for stretch, since flex-end cannot combine with overflow-auto */}
			<div className={'hidden md:block grow'}/>
			
			{waiting && (
				<div className={'w-full'}>
					<div className={c}>
						<div className={'px-2 inline-flex items-center w-full gap-4'}>
							<p className={'text-sm text-gray-500'}>耐心等待！可能需要十秒！因为OpenAI太忙了！</p>
							<progress className="progress progress-secondary flex-1"></progress>
						</div>
					</div>
				</div>
			)}
			
			<div className={'w-full mt-2 '}>
				<div className={clsx(c, 'relative py-2')}>
					<Textarea
						className={'w-full shadow-xl resize-none'}
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
				
				<div className={'md:hidden w-full grid grid-cols-2 gap-2 mt-2'}>
					<Sheet>
						<SheetTrigger asChild>
							<Button size={'sm'}>Conversations</Button>
						</SheetTrigger>
						<SheetContent className={'w-1/2 p-0'} position={'left'}>
							<ConversationsComp/>
						</SheetContent>
					</Sheet>
					<Button size={'sm'} onClick={onSubmit}>Send</Button>
				</div>
			</div>
		</div>
	)
}
