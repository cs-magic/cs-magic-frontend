import { IUserBasic } from '@/ds/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HTMLAttributes } from 'react'

export const AvatarView = ({ user, ...props }: {
	user: IUserBasic
} & HTMLAttributes<HTMLDivElement>
) => {
	return (
		<Avatar id={'userAvatar'} {...props}>
			<AvatarImage src={user.avatar}/>
			<AvatarFallback>{(user.name || 'U')[0]}</AvatarFallback>
		</Avatar>
	)
}
