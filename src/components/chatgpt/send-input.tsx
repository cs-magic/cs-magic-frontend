import { clsx } from 'clsx'
import { Textarea } from '@/components/ui/textarea'
import { IconBrandTelegram } from '@tabler/icons-react'
import { useU } from '@/hooks/use-u'
import { ReactNode, RefObject, useRef } from 'react'
import { Button } from '@/components/ui/button'

export const SendInput = ({ handleSubmit, extraButtonsOnMobile }: {
	handleSubmit: (ref: RefObject<HTMLTextAreaElement>) => void
	extraButtonsOnMobile?: ReactNode
}) => {
	const u = useU()
	const refInput = useRef<HTMLTextAreaElement>(null)
	
	const onSubmit = () => {
		if (refInput.current) {
			handleSubmit(refInput)
		}
	}
	
	return (
		<>
			{/* for stretch, since flex-end cannot combine with overflow-auto */}
			<div className={'hidden md:block grow'}/>
			<div className={clsx(
				'text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex m-auto break-all',
				'w-full relative ')}>
				<Textarea
					ref={refInput}
					className={'mt-2 mb-10 md:mb-2 w-full shadow-sm resize-none'}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							if (
								!event.metaKey && !event.shiftKey && !event.ctrlKey
								&& !event.nativeEvent.isComposing  // important! 检测是否在输入拼音，ref: (6条消息) js如何判断当前文本的输入状态——中文输入法的那些坑_怎么判断当前输入法是不是中文_小敏哥的博客-CSDN博客, https://blog.csdn.net/handsomexiaominge/article/details/80977402
							) {
								onSubmit()
								event.preventDefault() // prevent enter go down
							}
						}
					}}
					placeholder={u.ui.general.textarea.placeholder}
				/>
				<IconBrandTelegram className={'hidden md:block text-primary absolute right-3 bottom-6 cursor-pointer'} onClick={onSubmit}/>
			</div>
			
			
			<div className={'md:hidden fixed bottom-0 left-0 w-full grid grid-cols-2 divide-x divide-y-0 divide-slate-500'}>
				
				{extraButtonsOnMobile}
				<Button size={'sm'} className="rounded-none" onClick={onSubmit}>{u.ui.general.btn.send}</Button>
			</div>
		</>
	)
}
