import React, { useState } from 'react'
import { NextPage } from 'next'
import { getProviders, getSession, signIn } from 'next-auth/react'
import { TitleLineComp } from '@/components/shared/TitleLineComp'
import { Input } from '@/components/ui/input'
import { validate } from 'isemail'
import { NEXTAUTH_CALLBACK_URL } from '@/lib/env'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/router'
import { AuthLayout } from '@/layouts/AuthLayout'
import axios from 'axios'

const SigninPage: NextPage = () => {
	const { toast } = useToast()
	const [loading, setLoading] = useState(false)
	const [step, setStep] = useState(5)
	const router = useRouter()
	const [email, setEmail] = useState('')
	
	console.log('query (with error): ', router.query)
	
	const onSendEmail = async (email: string) => {
		if (!loading) {
			setLoading(true)
			setEmail(email)
			await signIn('email', {
				email,
				redirect: false,
			})
			toast({ title: 'sent magic code to ' + email })
		} else {
			toast({ title: 'duplicated send', variant: 'destructive' })
		}
	}
	
	
	return (
		<AuthLayout>
			
			<div className={'flex flex-col gap-2'}>
				
				{/*{step >= 1 && <TitleLineComp content={'Pickup your favorite name'} onTypingDone={() => step === 1 && setStep(step + 1)}/>}*/}
				
				{/*{*/}
				{/*	step >= 2 && (*/}
				{/*		<Input*/}
				{/*			name="username"*/}
				{/*			onKeyDown={(event) => {*/}
				{/*				if (['Enter', 'Tab'].includes(event.key)) {*/}
				{/*					event.preventDefault()*/}
				{/*					setStep(step + 1)*/}
				{/*				}*/}
				{/*			}}*/}
				{/*			autoFocus*/}
				{/*		/>*/}
				{/*	)*/}
				{/*}*/}
				
				{/*{step >= 3 && <TitleLineComp content={'Create a password'} onTypingDone={() => step === 3 && setStep(step + 1)}/>}*/}
				
				{/*{*/}
				{/*	step >= 4 && (*/}
				{/*		<Input*/}
				{/*			type="password"*/}
				{/*			name="password"*/}
				{/*			onKeyDown={(event) => {*/}
				{/*				if (['Enter', 'Tab'].includes(event.key)) {*/}
				{/*					event.preventDefault()*/}
				{/*					setStep(step + 1)*/}
				{/*				}*/}
				{/*			}}*/}
				{/*			autoFocus*/}
				{/*		/>*/}
				{/*	)*/}
				{/*}*/}
				
				{step >= 5 && <TitleLineComp content={'Enter your email'} onTypingDone={() => step === 5 && setStep(step + 1)}/>}
				
				{
					step >= 6 && (
						<Input
							type="email"
							name="email"
							autoFocus
							onChange={() => setLoading(false)}
							onKeyDown={async (event) => {
								if (!loading && ['Enter', 'Tab'].includes(event.key)) {
									setLoading(true)
									event.preventDefault() // suppress built-in validation
									const email = event.currentTarget.value
									if (!validate(email)) {
										toast({ variant: 'destructive', title: 'failed to validate your email' })
									} else {
										await onSendEmail(email)
										setStep(step + 1)
									}
								}
							}}
						/>
					)
				}
				
				{step >= 7 && <TitleLineComp content={'Input your magic code'} onTypingDone={() => step == 7 && setStep(step + 1)}/>}
				
				{step >= 8 && (
					<Input
						name={'code'}
						autoFocus
						onKeyDown={async (event) => {
							if (event.key === 'Enter') {
								event.preventDefault()
								const inputToken = event.currentTarget.value
								const targetToken = (await axios.get('/api/auth/tokens?id=' + email)).data.toString()
								// console.log({ inputToken, targetToken })
								if (inputToken !== targetToken) {
									// 直接前端验证！
									toast({ title: '验证码不对或者已失效！', variant: 'destructive' })
								} else {
									// 必须走一下这个next-auth的流程，以获得一些数据
									router.push(
										`/api/auth/callback/email?email=${encodeURIComponent(email)}&token=${inputToken}&callbackUrl=${NEXTAUTH_CALLBACK_URL}`,
									)
								}
							}
						}}
					/>
				)}
			</div>
		</AuthLayout>
	)
}

SigninPage.getInitialProps = async (context) => {
	const { req } = context
	const session = await getSession({ req })
	// todo: detect by session
	return {
		isLoggedIn: session !== null,
		providers: await getProviders(),
	}
}

export default SigninPage
