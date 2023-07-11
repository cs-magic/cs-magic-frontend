import { IUserBasic, User } from '@/ds/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HTMLAttributes } from 'react'
import { ID } from '@/ds/general'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'


export const BasicUserAvatar = (
	{
		id, user, ...props
	}: {
		id: ID,
		user: IUserBasic
	} & HTMLAttributes<HTMLDivElement>,
) => {
	const u = useAppSelector(selectU)
	const website = u.display.website
	
	
	return (
		<div className={'relative flex justify-center items-center'}>
			<Avatar {...props}>
				<AvatarImage src={user.avatar || undefined}/>
				<AvatarFallback>{(user.name || id || website.avatarPlaceholder)[0]}</AvatarFallback>
			</Avatar>
		</div>
	)
}


export const UserAvatar = ({ user, ...props }: { user: User } & HTMLAttributes<HTMLDivElement>) =>
	user
		? <BasicUserAvatar id={user.id} user={user.basic} {...props}/>
		: <Avatar {...props}><AvatarFallback>{'登录'}</AvatarFallback></Avatar>
