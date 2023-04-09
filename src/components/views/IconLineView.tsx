import { ReactNode } from 'react'
import { DynamicIconView } from '@/components/views/DynamicIconView'
import { clsx } from 'clsx'
import { Button } from '@/components/ui/button'

export const CompLine = ({
	                         icon,
	                         children,
	                         onClick,
	                         extra,
	                         highlight = false,
                         }: { icon: string, children: ReactNode, onClick?: any, extra?: ReactNode, highlight?: boolean }) => {
	return (
		<Button variant={'ghost'} className={clsx(
			'group w-full p-3 inline-flex items-center gap-2 hover:bg-[#2A2B32] cursor-pointer rounded-none border-b border-gray-200 dark:border-gray-700',
			highlight && 'bg-gray-200 dark:bg-gray-700',
		)} onClick={onClick}>
			<DynamicIconView id={icon}/>
			{children}
			{extra}
		</Button>
	)
}
