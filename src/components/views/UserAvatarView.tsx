import { IUserBasic, User } from '@/ds/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HTMLAttributes } from 'react'
import { u } from '@/config'
import { ID } from '@/ds/general'


export const BasicUserAvatarView = (
	{
		id, user, ...props
	}: {
		id: ID,
		user: IUserBasic
	} & HTMLAttributes<HTMLDivElement>,
) => {
	return (
		<Avatar {...props}>
			<AvatarImage src={user.avatar || undefined}/>
			<AvatarFallback className={'text-sm'}>{(user.name || id || u.website.avatarPlaceholder)[0]}</AvatarFallback>
		</Avatar>
	)
}


export const UserAvatarView = ({ user, ...props }: { user: User } & HTMLAttributes<HTMLDivElement>) =>
	user
		? <BasicUserAvatarView id={user.id} user={user.basic} {...props}/>
		: <Avatar {...props}><AvatarFallback className={'text-sm'}>{'登录'}</AvatarFallback></Avatar>
