import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useSelector } from 'react-redux'
import { selectUser } from '@/states/features/user'
import { useEffect } from 'react'
import { useAppDispatch } from '@/states/hooks'
import { updateUser } from '@/states/thunks/user'

export const CompUserAccount = () => {
	const dispatch = useAppDispatch()
	
	const user = useSelector(selectUser)
	
	useEffect(() => {
		dispatch(updateUser(user.id!))
	}, [])
	
	return (
		<>
			<DialogHeader>
				<DialogTitle>Your Account</DialogTitle>
				<DialogDescription>
					current balance: {user.balance}
				</DialogDescription>
			</DialogHeader>
		</>
	)
}
