import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useSelector } from 'react-redux'
import { selectUserChatgpt, selectUserId } from '@/states/features/userSlice'
import { useEffect } from 'react'
import { useAppDispatch } from '@/states/hooks'
import { updateChatgptUser } from '@/states/thunks/user'

export const UserAccountComp = () => {
	const dispatch = useAppDispatch()
	
	const userId = useSelector(selectUserId)
	const userChatgpt = useSelector(selectUserChatgpt)
	
	// 每次打开都更新一下信息！
	useEffect(() => {
		if (userId) {
			dispatch(updateChatgptUser(userId))
		}
	})
	
	return (
		<>
			<DialogHeader>
				<DialogTitle>Your Chatgpt</DialogTitle>
				<DialogDescription>
					current token balance: {userChatgpt.balance}
				</DialogDescription>
			</DialogHeader>
		</>
	)
}
