import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '@/states/store'

import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from 'next-themes'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// todo: add redux-persist
// import { PersistGate } from 'redux-persist/integration/react'


const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<Provider store={store}>
			
			{/*<PersistGate>*/}
			
			<QueryClientProvider client={queryClient}>
				
				<ThemeProvider attribute={'class'}>
					
					
					<GoogleAnalytics trackPageViews/>
					
					<Component {...pageProps} />
					
					<Toaster/>
				
				
				</ThemeProvider>
			
			</QueryClientProvider>
			
			{/*</PersistGate>*/}
		
		</Provider>
	)
}
