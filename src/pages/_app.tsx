import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '@/states/store'

import { Toaster } from '@/components/ui/toaster'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<Provider store={store}>
			
			<QueryClientProvider client={queryClient}>
				
				<ThemeProvider attribute={'class'}>
					
					<SessionProvider session={session}>
						
						<GoogleAnalytics trackPageViews/>
						
						<Component {...pageProps} />
						
						<Toaster/>
					
					</SessionProvider>
				
				</ThemeProvider>
			
			</QueryClientProvider>
		
		</Provider>
	)
}
