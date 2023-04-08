import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAppSelector } from '@/states/hooks'
import { selectUserBasic } from '@/states/features/userSlice'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { CompUserPlanning } from '@/components/shared/CompUserPlanning'
import { CompUserRegister } from '@/components/shared/CompUserRegister'
import { UserPlanning } from '@/ds/user'

export const CompNavbarAvatar = () => {
	const userBasic = useAppSelector(selectUserBasic)
	const { toast } = useToast()
	
	return (
		<Dialog>
			<DialogTrigger>
				<Avatar>
					<AvatarFallback>{userBasic.name ? userBasic.name[0] : 'U'}</AvatarFallback>
				</Avatar>
			</DialogTrigger>
			
			<DialogContent>
				
				<DialogHeader>
					<DialogTitle>Your Profile</DialogTitle>
				</DialogHeader>
				
				<div>id: <span className={'text-blue-500 cursor-pointer'} onClick={() => {
					if (userBasic.id) {
						navigator.clipboard.writeText(userBasic.id)
						toast({ title: 'copied your user_id' })
					}
				}}>
					{userBasic.id}
				</span></div>
				
				<div className={'flex justify-between items-center'}>
					planning: {userBasic.planning}
					
					{userBasic.planning === UserPlanning.guest ? (
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
