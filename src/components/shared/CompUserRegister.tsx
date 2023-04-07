import { Button } from '@/components/ui/button'
import { signIn, useSession, signOut } from 'next-auth/react'

export const CompUserRegister = () => {
	const { data: session } = useSession()
	
	return (
		<>
			{
				session ? (
					<Button variant={'destructive'} onClick={() => signOut()}>Sign Out</Button>
				) : (
					<Button variant={'destructive'} onClick={() => signIn()}>Sign In</Button>
				)
			}
		</>
	)
}
