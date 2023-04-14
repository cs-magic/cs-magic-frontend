import { IUserBasic } from '@/ds/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HTMLAttributes } from 'react'
import { u } from '@/config'

export const AvatarView = ({ user, ...props }: {
	                           user: IUserBasic
                           } & HTMLAttributes<HTMLDivElement>,
) => {
	return (
		<Avatar {...props}>
			<AvatarImage src={user.avatar}/>
			<AvatarFallback className={'text-sm'}>{(user.name || user.email || u.website.avatarPlaceholder).slice(0, 2)}</AvatarFallback>
		</Avatar>
	)
}
