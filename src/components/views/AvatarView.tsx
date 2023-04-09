import { IUserBasic } from '@/ds/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const AvatarView = ({ user }: {
	user: IUserBasic
}) => {
	return (
		<Avatar id={'userAvatar'}>
			<AvatarImage src={user.avatar}/>
			<AvatarFallback>{(user.name || 'U')[0]}</AvatarFallback>
		</Avatar>
	)
}
