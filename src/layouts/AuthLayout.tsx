import { RootLayout } from '@/layouts/RootLayout'
import { ReactNode } from 'react'

export const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<RootLayout>
			<div className={'bg-gray-900 text-gray-100 w-full h-full flex flex-col items-center justify-center gap-2'}>
				{children}
			</div>
		</RootLayout>
	)
}
