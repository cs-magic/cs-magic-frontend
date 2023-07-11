import { FC, ReactNode } from 'react'
import { RootLayout } from '@/layouts/RootLayout'

export const CentralLayout: FC<{ children: ReactNode, title?: string }> = (props) => (
	<RootLayout title={props.title}>
		<div className={'w-full h-full flex flex-col justify-center items-center overflow-auto'}>
			{props.children}
		</div>
	</RootLayout>
)
