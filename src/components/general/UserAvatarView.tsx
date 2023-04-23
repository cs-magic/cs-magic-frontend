import { IUserBasic, User, UserPlanningType } from '@/ds/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HTMLAttributes } from 'react'
import { ID } from '@/ds/general'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import Image from 'next/image'


export const BasicUserAvatarView = (
	{
		id, user, ...props
	}: {
		id: ID,
		user: IUserBasic
	} & HTMLAttributes<HTMLDivElement>,
) => {
	const u = useAppSelector(selectU)
	const website = u.display.website
	
	const avatarMain = (
		<Avatar {...props}>
			<AvatarImage src={user.avatar || undefined}/>
			<AvatarFallback>{(user.name || id || website.avatarPlaceholder)[0]}</AvatarFallback>
		</Avatar>
	)
	
	return user.membership.planning !== UserPlanningType.blackVip ? avatarMain : (
		<div className={'relative w-[72px] h-[72px] flex justify-center items-center'}>
			{avatarMain}
			{/*<Image src={'/avatar-bg/badge-blackVip.png'} alt={'black vip'} fill className={'absolute left-0 top-0'} sizes={"(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"}/>*/}
		</div>
	)
}


export const UserAvatarView = ({ user, ...props }: { user: User } & HTMLAttributes<HTMLDivElement>) =>
	user
		? <BasicUserAvatarView id={user.id} user={user.basic} {...props}/>
		: <Avatar {...props}><AvatarFallback>{'登录'}</AvatarFallback></Avatar>
