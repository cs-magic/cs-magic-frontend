import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { routers } from '@/config/routers'
import { useU } from '@/hooks/use-u'
import { useGrantTokenMutation } from '@/states/api/authApi'
import { useLazyGetUserQuery } from '@/states/api/userApi'
import { useAppDispatch } from '@/hooks/use-redux'
import { setUser } from '@/states/features/userSlice'
import { useRouter } from 'next/router'

'use client'

const formSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	password: z.string(),
})

export function ProfileForm() {
	const [grantToken] = useGrantTokenMutation()
	const [readUser] = useLazyGetUserQuery()
	
	const dispatch = useAppDispatch()
	const u = useU()
	const router = useRouter()
	
	
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})
	
	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log({ values })
		// todo: unify with register
		await grantToken({ ...values, scope: 'user:write user:read' }).unwrap()
		
		const data = await readUser(values.username).unwrap()
		await dispatch(setUser(data))
		
		await router.push(routers.home)
	}
	
	
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{u.display.auth.username}</FormLabel>
							<FormControl>
								<Input placeholder={u.display.auth.enterUsername} {...field} />
							</FormControl>
							<FormDescription>
								您的用户名将用于唯一标识
							</FormDescription>
							<FormMessage/>
						</FormItem>
					)}
				/>
				
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{u.display.auth.password}</FormLabel>
							<FormControl>
								<Input type={'password'} placeholder={u.display.auth.enterPassword} {...field} />
							</FormControl>
							<FormDescription>
								您的密码将加密存储于服务器
							</FormDescription>
							<FormMessage/>
						</FormItem>
					)}
				/>
				
				<div className={'w-full inline-flex justify-between items-center'}>
					<Button type="submit" variant={'outline'}>登录</Button>
					
					<Link href={routers.auth.register}>
						<Button type="submit" variant={'destructive'}>注册</Button>
					</Link>
				</div>
			
			</form>
		</Form>
	)
}


export default ProfileForm
