import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '@/states/store'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import { FPJS_API_KEY } from '@/lib/env'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<FpjsProvider loadOptions={{ apiKey: FPJS_API_KEY }}>
				
				<Component {...pageProps} />
			
			</FpjsProvider>
		</Provider>
	)
}
