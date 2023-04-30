import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ReactNode } from 'react'
import { LangType } from '@/ds/general'

export const BaseSelect = <T extends string | LangType>({ label, vs, v, setV, icon, withText, withIconSuffix, withIconPrefix }: {
	label: string
	vs: readonly T[]
	v?: T
	setV: (v: T) => void
	icon: ReactNode
	withText?: boolean,
	withIconSuffix?: boolean,
	withIconPrefix?: boolean
}) => {
	
	return (
		<Select onValueChange={setV}>
			<SelectTrigger className={'h-fit py-0 px-1 border-none hover:bg-accent'} withIconSuffix={withIconSuffix}>
				<SelectValue defaultValue={v || vs[0]} asChild>
					<span className={'inline-flex gap-2 items-center'}>
						{withIconPrefix && <span className={'mx-2'}>{icon}</span>}
						{withText && <span>{label}</span>}
					</span>
				</SelectValue>
			</SelectTrigger>
			
			<SelectContent className={'w-32'}>
				<SelectGroup>
					<SelectLabel>{label}</SelectLabel>
					{
						vs.map((v) => (
							<SelectItem className={'cursor-pointer'} value={v} key={v}>{v}</SelectItem>
						))
					}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
