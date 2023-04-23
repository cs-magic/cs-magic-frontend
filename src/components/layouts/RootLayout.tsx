import Head from 'next/head'
import { ReactNode, useEffect } from 'react'
import { selectNotifications } from '@/states/features/notificationSlice'
import { getProviders, getSession } from 'next-auth/react'
import { getTitle } from '@/lib/utils'
import { useAppSelector } from '@/hooks/use-redux'
import { FooterView } from '@/components/layouts/footer/FooterView'
import { NavBarResponsive } from '@/components/layouts/navbar/NavBar'

export const RootLayout = ({ children, title }: {
	children: ReactNode
	title?: string
}) => {
	const notifications = useAppSelector(selectNotifications)
	
	useEffect(() => {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`)
	}, [])
	
	
	return (
		<>
			<Head>
				<title>{getTitle(title, true)}</title>
				<meta name="description" content="Generated by create next app"/>
				<meta name={'viewport'} content={'width=device-width, user-scalable=no'}/>
				<link rel="icon" href="/logo/logo.ico"/>
			</Head>
			
			<main>
				<div className={'max-w-[1400px] min-h-screen m-auto flex flex-col'}>
					{notifications.top && (
						<div className={'bg-red-800 text-white p-4 flex justify-center items-center'}>
							{notifications.top}
						</div>
					)}
					
					<NavBarResponsive/>
					
					<div className={'w-full grow flex flex-col border border-base-300 p-2'}>
						{children}
					</div>
					
					<div className={'hidden md:block'}>
						<FooterView/>
					</div>
				</div>
			</main>
		</>
	)
}

RootLayout.getInitialProps = async (context: any) => {
	const { req } = context
	const session = await getSession({ req })
	
	// ref: https://stackoverflow.com/a/70167665/9422455
	const host = context.req?.headers.host || ''
	const baseUrl = host.includes('magic') ? 'https://' + host : 'http://' + host
	process.env.NEXTAUTH_URL = baseUrl
	console.log('initial', { baseUrl })
	
	return {
		isLoggedIn: session !== null,
		providers: await getProviders(),
		baseUrl,
	}
}
