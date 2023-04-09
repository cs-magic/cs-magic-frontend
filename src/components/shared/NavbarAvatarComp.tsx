import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAppSelector } from '@/states/hooks'
import { selectUserBasic, selectUserId } from '@/states/features/userSlice'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { UserPlanningComp } from '@/components/shared/UserPlanningComp'
import { UserRegisterComp } from '@/components/shared/UserRegisterComp'

export const NavbarAvatarComp = () => {
	const userId = useAppSelector(selectUserId)
	const userBasic = useAppSelector(selectUserBasic)
	const { toast } = useToast()
	
	return (
		<Dialog>
			<DialogTrigger>
				<Avatar>
					<AvatarFallback>{(userBasic.name || userId || 'U')[0]}</AvatarFallback>
				</Avatar>
			</DialogTrigger>
			
			<DialogContent>
				
				<DialogHeader>
					<DialogTitle>Your Profile</DialogTitle>
				</DialogHeader>
				
				{
					userId && (
						<div className={'flex justify-between items-center'}>
							<p>
								id:
								<span className={'text-blue-500 cursor-pointer'} onClick={() => {
									navigator.clipboard.writeText(userId)
									toast({ title: 'copied your user_id' })
								}}>
								{userId}
							</span>
							</p>
							
							<UserRegisterComp/>
						</div>
					)
				}
				
				<div className={'flex justify-between items-center'}>
					planning: {userBasic.planning}
					<UserPlanningComp/>
				
				</div>
			</DialogContent>
		
		</Dialog>
	)
}
