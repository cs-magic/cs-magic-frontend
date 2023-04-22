import { FC, ReactNode } from 'react'
import { RootLayout } from '@/components/layouts/RootLayout'

export const CentralLayout: FC<{ children: ReactNode, title?: string }> = (props) => (
	<RootLayout title={props.title}>
		<div className={'w-full grow flex flex-col justify-center items-center overflow-auto'}>
			{props.children}
		</div>
	</RootLayout>
)
