import { WindupChildren } from 'windups'
import React from 'react'


export const Typer = (props: { content: string, start: boolean, onFinished: any }) => {
	if (!props.start) return null
	return (
		<WindupChildren onFinished={props.onFinished}>
			{props.content}
		</WindupChildren>
	)
}
export const TyperMemo = Typer //memo(Typer)
