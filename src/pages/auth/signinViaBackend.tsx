import React, { forwardRef, useRef, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Input, InputProps } from '@/components/ui/input'
import { validate } from 'isemail'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/router'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import { TyperMemo } from '@/components/general/Typer'
import { useCheckUsernameMutation, useSendEmailVerificationCodeMutation, useVerifyEmailMutation } from '@/states/api/authApi'
import { isFastapiError } from '@/ds/error'


const NextInput = forwardRef<HTMLInputElement, InputProps & { next: Function }>(({ next, ...props }, ref) => {
	return (
		<Input
			ref={ref}
			{...props}
			autoFocus
			onKeyDown={async (event) => {
				if (
					// !loading &&
					['Enter', 'Tab'].includes(event.key)) {
					event.preventDefault() // suppress built-in validation
					next()
				}
			}}
		/>
	)
})

NextInput.displayName = 'NextInput'

const SigninPage: NextPage<{ baseUrl: string }> = ({ baseUrl }) => {
	
	const { toast } = useToast()
	const [loading, setLoading] = useState(false)
	const [step, setStep] = useState(1)
	const [email, setEmail] = useState('')
	const refInputEmail = useRef<HTMLInputElement>(null)
	const refInputCode = useRef<HTMLInputElement>(null)
	const refInputUsername = useRef<HTMLInputElement>(null)
	const refInputPassword = useRef<HTMLInputElement>(null)
	const refInputPasswordAgain = useRef<HTMLInputElement>(null)
	
	const router = useRouter()
	const u = useAppSelector(selectU)
	
	const [sendEmailVerificationCode, { error: errorSendVerificationCode }] = useSendEmailVerificationCodeMutation()
	const [verifyEmail, { error: errorVerifyEmail }] = useVerifyEmailMutation()
	const [checkUsername, { error: errorCheckUsername }] = useCheckUsernameMutation()
	
	
	const onNextStep = async () => {
		setLoading(true)
		let error
		
		switch (step) {
			case 2:
				// input email
				const _email = refInputEmail.current!.value
				console.log({ email: _email })
				if (!validate(_email)) return toast({ variant: 'destructive', title: 'failed to validate your email' })
				setEmail(_email)
				toast({ title: 'sending magic code to ' + _email })
				const res = await sendEmailVerificationCode(_email)
				console.log('sign in res: ', res)
				error = errorSendVerificationCode
				break
			
			case 4:
				// verify email
				const inputCode = refInputCode.current!.value
				await verifyEmail({ email, code: inputCode })
				error = errorVerifyEmail
				break
			
			case 6:
				// check username
				await checkUsername(refInputUsername.current!.value)
				error = errorCheckUsername
				break
			
			default:
				break
		}
		
		if (error) {
			if (isFastapiError(error))
				toast({ title: error.data.detail, variant: 'destructive' })
		} else {
			setStep(step + 1)
		}
		
		setLoading(false)
	}
	console.log({ step })
	
	
	return (
		<AuthLayout title={u.routers.auth.signin}>
			
			<div className={'flex flex-col gap-2 text-[#02CEC7] font-bold'}>
				
				<TyperMemo content={u.display.auth.enterEmail} start={step >= 1} onFinished={() => {setStep(2)}}/>
				
				{step >= 2 && <NextInput ref={refInputEmail} type="email" name="email" next={onNextStep}/>}
				
				<TyperMemo content={u.display.auth.enterVerificationCode} start={step >= 3} onFinished={() => {setStep(4)}}/>
				
				{step >= 4 && <NextInput ref={refInputCode} name={'code'} next={onNextStep}/>}
				
				<TyperMemo content={u.display.auth.enterUsername} start={step >= 5} onFinished={() => {setStep(6)}}/>
				
				{step >= 6 && <NextInput ref={refInputUsername} name={'username'} type={'username'} next={onNextStep}/>}
				
				<TyperMemo content={u.display.auth.enterPassword} start={step >= 7} onFinished={() => {setStep(8)}}/>
				
				{step >= 8 && <NextInput ref={refInputPassword} name={'password'} type={'password'} next={onNextStep}/>}
				
				<TyperMemo content={u.display.auth.confirmPassword} start={step >= 9} onFinished={() => {setStep(10)}}/>
				
				{step >= 10 && <NextInput ref={refInputPasswordAgain} name={'passwordAgain'} type={'password'} next={onNextStep}/>}
				
				{step % 2 === 0 && <Button variant={'outline'} onClick={onNextStep}>{u.display.auth.ok}</Button>}
			
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
