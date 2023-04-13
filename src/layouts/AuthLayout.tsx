import { RootLayout } from '@/layouts/RootLayout'
import { FC, ReactNode } from 'react'

export const AuthLayout: FC<{ children: ReactNode, title?: string }> = (props) => {
	return (
		<RootLayout title={props.title}>
			<div className={'bg-gray-900 text-gray-100 w-full h-full flex flex-col items-center justify-center gap-2'}>
				{props.children}
			</div>
		</RootLayout>
	)
}
