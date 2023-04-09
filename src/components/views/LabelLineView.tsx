import { Label } from '@/components/ui/label'
import { FormEvent, FormEventHandler, ReactNode } from 'react'

export const LabelLineView = ({ label, content, extra, onSubmit }: {
	label: string
	content: ReactNode
	extra?: ReactNode
	onSubmit?: FormEventHandler<HTMLFormElement>
}) => {
	return (
		<form className={'flex justify-between items-center'} onSubmit={onSubmit}>
			<div className={'inline-flex gap-2 items-center'}>
				<Label className={'w-16 shrink-0'}>{label}</Label>
				{content}
			</div>
			{extra}
		</form>
	)
}
