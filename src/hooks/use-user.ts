import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { IUser, User } from '@/ds/user'
import { useGetUserQuery, useLazyGetUserQuery } from '@/api/userApi'
import { skipToken } from '@reduxjs/toolkit/query'
import { ID } from '@/ds/general'


export const useUser = (): User | null => {
	const { data: session } = useSession()
	const [user, setUser] = useState<User>(null)
	const id = session?.user.id
	
	const { data: userData } = useGetUserQuery(id ?? skipToken)
	
	useEffect(() => {
		if (!userData) return
		setUser(userData)
	}, [userData])
	
	return user
}


export const useLazyUser = (): [IUser | undefined, (id: ID) => void] => {
	const { data: session } = useSession()
	const id = session?.user.id
	
	const [getUser, { data: userData }] = useLazyGetUserQuery()
	
	useEffect(() => {
		if (!id) return
		getUser(id)
	}, [id])
	
	return [userData, getUser]
}

export const useUserId = (): ID | null => {
	const user = useUser()
	return user ? user.id : null
}
