import Head from 'next/head'
import { ReactNode, useEffect } from 'react'
import { NavBarComp } from '@/components/shared/NavBarComp'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { initUser } from '@/states/thunks/user'
import { selectNotifications } from '@/states/features/notificationSlice'
import { useSession } from 'next-auth/react'

export const RootLayout = ({ children, title }: {
	children: ReactNode
	title?: string
}) => {
	const dispatch = useAppDispatch()
	const { data: session } = useSession()
	const notifications = useAppSelector(selectNotifications)
	
	const user_id = session?.user.id
	
	useEffect(() => {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`)
	}, [])
	
	useEffect(() => {
		if (user_id) {
			dispatch(initUser(user_id))
		}
	}, [user_id])
	
	return (
		<>
			<Head>
				<title>Your ChatGPT</title>
				<meta name="description" content="Generated by create next app"/>
				<meta name={'viewport'} content={'width=device-width, user-scalable=no'}/>
				<link rel="icon" href="/public/favicon.ico"/>
			</Head>
			
			<main>
				<div className={'m-auto max-w-[1400px] h-full flex flex-col'}>
					{notifications.top && (
						<div className={'bg-red-800 text-white p-4 flex justify-center items-center'}>
							{notifications.top}
						</div>
					)}
					
					<NavBarComp title={title}/>
					
					<div className={'w-full grow flex flex-col items-center justify-center gap-2'}>
						{children}
					</div>
				</div>
			</main>
		</>
	)
}
