import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAppSelector } from '@/states/hooks'
import { selectUser, UserPlanning } from '@/states/features/user'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { CompUserPlanning } from '@/components/shared/CompUserPlanning'
import { CompUserRegister } from '@/components/shared/CompUserRegister'

export const CompNavbarAvatar = () => {
	const user = useAppSelector(selectUser)
	const { toast } = useToast()
	
	return (
		<Dialog>
			<DialogTrigger>
				<Avatar>
					<AvatarFallback>{user.name ? user.name[0] : 'U'}</AvatarFallback>
				</Avatar>
			</DialogTrigger>
			
			<DialogContent>
				
				<DialogHeader>
					<DialogTitle>Your Profile</DialogTitle>
				</DialogHeader>
				
				<div>id: <span className={'text-blue-500 cursor-pointer'} onClick={() => {
					if (user.id) {
						navigator.clipboard.writeText(user.id)
						toast({ title: 'copied your user_id' })
					}
				}}>
					{user.id}
				</span></div>
				
				<div className={'flex justify-between items-center'}>
					planning: {user.planning}
					
					{user.planning === UserPlanning.guest ? (
							<CompUserRegister/>
						)
						: (
							<CompUserPlanning/>
						)}
				
				
				</div>
			</DialogContent>
		
		</Dialog>
	)
}
