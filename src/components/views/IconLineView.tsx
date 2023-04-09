import { ReactNode } from 'react'
import { DynamicIconView } from '@/components/views/DynamicIconView'

export const CompLine = ({ icon, children, onClick, extra }: { icon: string, children: ReactNode, onClick?: any, extra?: ReactNode }) => {
	return (
		<div className={'group w-full p-3 inline-flex items-center gap-2 hover:bg-[#2A2B32] cursor-pointer'} onClick={onClick}>
			<DynamicIconView id={icon}/>
			<p className={'truncate'}>{children}</p>
			{extra}
		</div>
	)
}
