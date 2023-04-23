import { Label } from '@/components/ui/label'
import { FormEvent, FormEventHandler, ReactNode } from 'react'
import _ from 'lodash'

export const LabelLineView = ({ label, content, extra, onSubmit }: {
	label: string
	content: ReactNode
	extra?: ReactNode
	onSubmit?: FormEventHandler<HTMLFormElement>
}) => {
	return (
		<form className={'flex justify-between items-center gap-2'} onSubmit={onSubmit}>
			<div className={'inline-flex gap-2 items-center grow'}>
				<Label className={'w-16 shrink-0'}>{_.capitalize(label)}</Label>
				{content}
			</div>
			<div className={'shrink-0'}>{extra}</div>
		</form>
	)
}
