import { User } from '@/ds/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HTMLAttributes } from 'react'
import { u } from '@/config'

export const AvatarView = (
	{
		user, ...props
	}: {
		user: User
	} & HTMLAttributes<HTMLDivElement>,
) => {
	return (
		<Avatar {...props}>
			{
				user ? (
					<>
						<AvatarImage src={user.basic.avatar || undefined}/>
						<AvatarFallback className={'text-sm'}>{(user.basic.name || user.id || u.website.avatarPlaceholder)[0]}</AvatarFallback>
					</>
				) : (
					<AvatarFallback className={'text-sm'}>{'登录'}</AvatarFallback>
				)
			}
		</Avatar>
	)
}
