import { User } from '@/ds/user'
import { ID } from '@/ds/general'
import { useAppSelector } from '@/hooks/use-redux'
import { selectUser } from '@/states/features/userSlice'


export const useUser = (): User => useAppSelector(selectUser)


// export const useLazyUser = (): [IUser | undefined, (id: ID) => void] => {
// 	const { data: session } = useSession()
// 	const id = session?.user.id
//
// 	const [getUser, { data: userData }] = useLazyGetUserQuery()
//
// 	useEffect(() => {
// 		if (!id) return
// 		getUser(id)
// 	}, [id])
//
// 	return [userData, getUser]
// }

export const useUserId = (): ID | null => {
	const user = useUser()
	return user ? user.id : null
}


export const useAdmin = (): boolean => {
	const user = useUser()
	return user?.basic.role === 'admin'
}
