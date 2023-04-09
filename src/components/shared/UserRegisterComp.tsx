import { Button } from '@/components/ui/button'
import { signIn, useSession, signOut } from 'next-auth/react'

export const UserRegisterComp = () => {
	const { data: session } = useSession()
	
	return (
		<>
			{
				session ? (
					<Button variant={'ghost'} size={'sm'} onClick={() => signOut()}>Sign Out</Button>
				) : (
					<Button variant={'destructive'} size={'sm'} onClick={() => signIn()}>Sign In</Button>
				)
			}
		</>
	)
}
