import React, { useRef, useState } from 'react'
import { WindupChildren } from 'windups'
import { Input, InputProps } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useU } from '@/hooks/use-u'
import { Loading } from '@/components/general/CentralLoading'
import { InputState } from '@/ds/states'

export interface ITyperFormField {
	prompt: string
	inputProps?: InputProps
	nextStep: (val: string) => void
	globalStep: number
	step: number
	setStep: any
}

export const TyperFormField = (props: ITyperFormField) => {
	const u = useU()
	const [state, setState] = useState<InputState>(InputState.preparing)
	const ref = useRef<HTMLInputElement>(null)
	
	if (props.globalStep < props.step) return null
	
	return (
		<>
			<WindupChildren
				onFinished={() => setState(InputState.going)}
			>
				{/*<p/* className={'text-primary-foreground'}*/}
				{props.prompt}
				{/*</p>*/}
			
			</WindupChildren>
			
			{state >= InputState.going && (
				<Input
					ref={ref}
					autoFocus {...props.inputProps}
					onKeyDown={async (event) => {
						setState(InputState.going)
						props.setStep(props.step)
						if (
							// !loading &&
							['Enter', 'Tab'].includes(event.key)) {
							event.preventDefault() // suppress built-in validation
							setState(InputState.finished)
							props.nextStep(ref.current!.value)
							setState(InputState.going)
						}
					}}/>
			)}
			{
				props.step === props.globalStep && (
					<Button disabled={state === InputState.finished} variant={'outline'} onClick={() => props.nextStep(ref.current!.value)}>
						{state === InputState.going ? u.display.auth.ok : <Loading/>}
					</Button>
				)
			}
		</>
	)
}
