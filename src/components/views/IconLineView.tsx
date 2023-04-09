import { ReactNode } from 'react'
import { DynamicIconView } from '@/components/views/DynamicIconView'
import { clsx } from 'clsx'

export const CompLine = ({
	                         icon,
	                         children,
	                         onClick,
	                         extra,
	                         highlight = false,
                         }: { icon: string, children: ReactNode, onClick?: any, extra?: ReactNode, highlight?: boolean }) => {
	return (
		<div className={clsx(
			'group w-full p-3 inline-flex items-center gap-2 hover:bg-[#2A2B32] cursor-pointer',
			highlight && 'bg-gray-200 dark:bg-gray-700',
		)} onClick={onClick}>
			<DynamicIconView id={icon}/>
			{children}
			{extra}
		</div>
	)
}
