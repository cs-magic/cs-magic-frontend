import { useUser } from '@/hooks/use-user'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { UserAvatarView } from '@/components/general/UserAvatarView'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const User = () => {
	const user = useUser()
	
	if (user)
		return (
			<Popover>
				<PopoverTrigger>
					<UserAvatarView user={user}/>
				</PopoverTrigger>
				
				<PopoverContent>
					todo
				</PopoverContent>
			</Popover>
		)
	
	return (
		<div className={'inline-flex items-center gap-2'}>
			<Link href={'/auth/signin'}>
				<Button variant={'ghost'}>登录</Button>
			</Link>
			
			<Link href={'/auth/register'}>
				<Button variant={'outline'}>注册</Button>
			</Link>
		</div>
	)
}
