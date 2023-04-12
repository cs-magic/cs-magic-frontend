import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '@/states/store'

import { Toaster } from '@/components/ui/toaster'
import { getProviders, getSession, SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import SigninPage from '@/pages/auth/signin'


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<Provider store={store}>
			
			<ThemeProvider>
				
				<SessionProvider session={session}>
					
					<Component {...pageProps} />
					
					<Toaster/>
				
				</SessionProvider>
			
			</ThemeProvider>
		</Provider>
	)
}
