import React, { useRef, useState } from 'react'
import { NextPage } from 'next'
import { getProviders, getSession, signIn } from 'next-auth/react'
import { TitleLineComp } from '@/components/shared/TitleLineComp'
import { Input } from '@/components/ui/input'
import { validate } from 'isemail'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/router'
import { AuthLayout } from '@/layouts/AuthLayout'
import axios from 'axios'
import { Button } from '@/components/ui/button'

const SigninPage: NextPage = () => {
	const { toast } = useToast()
	const [loading, setLoading] = useState(false)
	const [step, setStep] = useState(5)
	const router = useRouter()
	const [email, setEmail] = useState('')
	const refEmailInput = useRef<HTMLInputElement>(null)
	const refTokenInput = useRef<HTMLInputElement>(null)
	
	const onConfirmEmail = async () => {
		if (loading) {
			toast({ title: 'duplicated send', variant: 'destructive' })
			return
		}
		
		const email = refEmailInput.current!.value
		console.log({ email })
		setLoading(true)
		setEmail(email)
		toast({ title: 'sending magic code to ' + email })
		
		if (!validate(email)) {
			toast({ variant: 'destructive', title: 'failed to validate your email' })
		} else {
			await signIn('email', {
				email,
				redirect: false,
			})
			setStep(step + 1)
		}
	}
	
	const onConfirmToken = async () => {
		const inputToken = refTokenInput.current!.value
		const targetToken = (await axios.get('/api/auth/tokens?id=' + email)).data.toString()
		// console.log({ inputToken, targetToken }) // 不能在前端打印这个
		if (inputToken !== targetToken) {
			// 直接前端验证！
			toast({ title: '验证码不对或者已失效！', variant: 'destructive' })
		} else {
			// 必须走一下这个next-auth的流程，以获得一些数据
			router.push(
				`/api/auth/callback/email?email=${encodeURIComponent(email)}&token=${inputToken}&callbackUrl=/`,
			)
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
							ref={refEmailInput}
							type="email"
							name="email"
							autoFocus
							onChange={() => {
								setLoading(false)
								setStep(6)
							}}
							onKeyDown={async (event) => {
								if (!loading && ['Enter', 'Tab'].includes(event.key)) {
									event.preventDefault() // suppress built-in validation
									onConfirmEmail()
								}
							}}
						/>
					)
				}
				{step == 6 && !loading && <Button className={'bg-gray-700'} onClick={onConfirmEmail}>Confirm Email</Button>}
				
				{step >= 7 && <TitleLineComp content={'Input your magic code'} onTypingDone={() => step == 7 && setStep(step + 1)}/>}
				
				{step >= 8 && (
					<Input
						ref={refTokenInput}
						name={'code'}
						autoFocus
						onKeyDown={async (event) => {
							if (event.key === 'Enter') {
								event.preventDefault()
								onConfirmToken()
							}
						}}
					/>
				)}
				
				{step == 8 && <Button className={'bg-gray-700'} onClick={onConfirmToken}>Start Your Journey</Button>}
			
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
