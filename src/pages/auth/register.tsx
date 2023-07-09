import React, { forwardRef, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Input, InputProps } from '@/components/ui/input'
import { validate } from 'isemail'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/router'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import {
	useCheckUsernameMutation,
	useGrantTokenMutation,
	useRegisterMutation,
	useSendEmailVerificationCodeMutation,
	useVerifyEmailMutation,
} from '@/states/api/authApi'
import { TyperFormField } from '@/components/TyperFormField'
import { useU } from '@/hooks/use-u'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/hooks/use-redux'
import { IUserBase } from '@/ds/auth'


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
	const [step, setStep] = useState(3)
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	
	const router = useRouter()
	const u = useU()
	
	const [sendEmailVerificationCode] = useSendEmailVerificationCodeMutation()
	const [verifyEmail] = useVerifyEmailMutation()
	const [checkUsername] = useCheckUsernameMutation()
	const [register] = useRegisterMutation()
	const [grantToken] = useGrantTokenMutation()
	
	const dispatch = useAppDispatch()
	
	
	const stepSendEmail = async (email: string) => {
		if (!validate(email)) return toast({ variant: 'destructive', title: 'failed to validate your email' })
		setEmail(email)
		toast({ title: 'sending magic code to ' + email })
		await sendEmailVerificationCode(email).unwrap()
		setStep(2)
	}
	
	const stepVerifyEmail = async (code: string) => {
		await verifyEmail({ email, code }).unwrap()
		setStep(3)
	}
	
	const stepCheckUsername = async (username: string) => {
		await checkUsername(username).unwrap()
		setUsername(username)
		setStep(4)
	}
	
	const stepEnterPassword = async (password: string) => {
		setPassword(password)
		setStep(5)
	}
	
	const stepConfirmPassword = async (newPassword: string) => {
		if (password !== newPassword) {
			toast({ title: '密码不匹配', variant: 'destructive' })
		} else {
			setStep(6)
		}
	}
	
	const stepEnterInvitation = async (code: string) => {
		console.log({ code })
		setStep(7)
	}
	
	return (
		<AuthLayout title={u.routers.auth.register}>
			
			<form className={'flex flex-col gap-2 text-[#02CEC7] font-bold'} onSubmit={async (event) => {
				event.preventDefault()
				console.log({ event })
				const formData = new FormData(event.currentTarget)
				const jsonData = Object.fromEntries(formData) as unknown as IUserBase
				console.log({ formData, jsonData })
				await register(formData).unwrap() // note: 要用formData提交
				const res = await grantToken({ ...jsonData, scope: 'user:write user:read' }).unwrap()
				console.log('granted token: ', res)
			}}>
				
				{/* todo: 邮箱要加入防重复 */}
				{/*<TyperFormField prompt={u.display.auth.enterEmail}*/}
				{/*                inputProps={{ type: 'email', name: 'email' }}*/}
				{/*                step={1}*/}
				{/*                globalStep={step}*/}
				{/*                setStep={setStep}*/}
				{/*                nextStep={stepSendEmail}/>*/}
				
				{/*<TyperFormField prompt={u.display.auth.enterVerificationCode}*/}
				{/*	              nextStep={stepVerifyEmail}*/}
				{/*	              step={2}*/}
				{/*	              globalStep={step}*/}
				{/*	              setStep={setStep}/>*/}
				
				<TyperFormField prompt={u.display.auth.enterUsername}
				                inputProps={{ name: 'username' }}
				                nextStep={stepCheckUsername}
				                step={3}
				                globalStep={step}
				                setStep={setStep}/>
				
				<TyperFormField prompt={u.display.auth.enterPassword}
				                inputProps={{ type: 'password', name: 'password' }}
				                nextStep={stepEnterPassword}
				                step={4}
				                globalStep={step}
				                setStep={setStep}/>
				
				<TyperFormField prompt={u.display.auth.confirmPassword}
				                inputProps={{ type: 'password' }}
				                nextStep={stepConfirmPassword}
				                step={5}
				                globalStep={step}
				                setStep={setStep}/>
				
				<TyperFormField prompt={u.display.auth.askForInvitationCode}
				                inputProps={{ name: 'invitation' }}
				                nextStep={stepEnterInvitation}
				                step={6}
				                globalStep={step}
				                setStep={setStep}/>
				
				{step === 7 && <Button type={'submit'} variant={'default'} autoFocus>{u.display.auth.finishedAuth}</Button>}
			</form>
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
