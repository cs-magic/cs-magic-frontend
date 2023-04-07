import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/states/hooks'
import { selectUser, selectUserID } from '@/states/features/user'

export const CompUserPlanning = () => {
	const user = useAppSelector(selectUser)!
	
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'destructive'} size={'sm'}>Change Planning</Button>
			</DialogTrigger>
			
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Change Planning</DialogTitle>
				</DialogHeader>
				
				<div>current planning: {user.planning}</div>
			</DialogContent>
		</Dialog>
	)
}
