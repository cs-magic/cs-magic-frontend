import React, { useEffect, useRef, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { TitleLineComp } from '@/components/general/TitleLineComp'
import { Input } from '@/components/ui/input'
import { validate } from 'isemail'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/router'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import { LogoHomeView } from '@/components/layouts/navbar/LogoHomeView'
import axios from 'axios'

const getToken = async (email: string): Promise<string> =>
	(await axios.get('/api/auth/token?email=' + email)).data.toString()

const SigninPage: NextPage<{ baseUrl: string }> = ({ baseUrl }) => {
	
	const { toast } = useToast()
	const [loading, setLoading] = useState(false)
	const [step, setStep] = useState(5)
	const [email, setEmail] = useState('')
	const refEmailInput = useRef<HTMLInputElement>(null)
	const refTokenInput = useRef<HTMLInputElement>(null)
	
	const router = useRouter()
	const u = useAppSelector(selectU)
	
	useEffect(() => {
		getToken('').catch() // activate the router
	}, [])
	
	const onConfirmEmail = async () => {
		if (loading) {
			toast({ title: 'duplicated send', variant: 'destructive' })
			return
		}
		
		const email = refEmailInput.current!.value
		console.log({ email })
		
		if (!validate(email)) return toast({ variant: 'destructive', title: 'failed to validate your email' })
		
		setLoading(true)
		setEmail(email)
		toast({ title: 'sending magic code to ' + email })
		
		
		const res = await signIn('email', {
			email,
			redirect: false,
			// ref: https://next-auth.js.org/getting-started/client#specifying-a-callbackurl
			callbackUrl: baseUrl,
		})
		console.log('sign in res: ', res)
		if (res!.error) {
			setLoading(false)
			toast({ title: '发送失败！可能该邮箱并不存在！', variant: 'destructive' })
			return
		}
		
		console.log({ tokensAfter: await getToken(email) })
		setLoading(false)
		if (step === 6) setStep(7)
		
	}
	
	const onConfirmToken = async () => {
		const inputToken = refTokenInput.current!.value
		const targetToken = await getToken(email)
		console.log({ inputToken, targetToken }) // 不能在前端打印这个
		if (inputToken !== targetToken) {
			// 直接前端验证！
			toast({ title: '验证码不对或者已失效！', variant: 'destructive' })
		} else {
			// 必须走一下这个next-auth的流程，以获得一些数据
			router.push(
				`/api/auth/callback/email?email=${encodeURIComponent(email)}&token=${inputToken}`, // &callbackUrl=${baseUrl}`,
			)
		}
	}
	
	return (
		<AuthLayout title={u.routers.auth.signin}>
			
			<div className={'flex flex-col gap-2'}>
				
				<LogoHomeView/>
				
				{step >= 5 && <TitleLineComp content={'Enter your email'} onTypingDone={() => step === 5 && setStep(step + 1)}/>}
				
				{
					step >= 6 && (
						<Input
							ref={refEmailInput}
							type="email"
							name="email"
							autoFocus
							onKeyDown={async (event) => {
								if (!loading && ['Enter', 'Tab'].includes(event.key)) {
									event.preventDefault() // suppress built-in validation
									onConfirmEmail()
								}
							}}
						/>
					)
				}
				{step == 6 && !loading && <Button variant={'outline'} onClick={onConfirmEmail}>Confirm Email</Button>}
				
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
				
				{step == 8 && <Button variant={'outline'} onClick={onConfirmToken}>Start Your Journey</Button>}
			
			</div>
		</AuthLayout>
	)
}

/**
 * @desc 不能使用 `SigninPage.initialProps` 这个只会在第一次访问页面时才会提供，第二次（例如url跳转）就不行
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
	
	// todo: detect by session
	// ref: https://stackoverflow.com/a/70167665/9422455
	const host = context.req?.headers.host || ''
	
	const baseUrl = host.includes('magic') ? 'https://' + host : 'http://' + host
	console.log({ host, baseUrl })
	process.env.NEXTAUTH_URL = baseUrl
	return {
		props: {
			baseUrl,
		},
	}
}

export default SigninPage
