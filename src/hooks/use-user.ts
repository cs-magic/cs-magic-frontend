import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { initUserState, UserState } from '@/ds/user'
import { useGetUserBasicQuery } from '@/api/userApi'
import { skipToken } from '@reduxjs/toolkit/query'
import { useGetUserChatGPTQuery } from '@/api/openai/chatgptApi'
import { ID } from '@/ds/general'


export const useUser = (): UserState => {
	const { data: session } = useSession()
	const [user, setUser] = useState<UserState>(initUserState)
	const id = session?.user.id
	
	const { data: userBasic } = useGetUserBasicQuery(id ?? skipToken)
	const { data: userChatGPT } = useGetUserChatGPTQuery(id ?? skipToken)
	
	useEffect(() => {
		if (!id) return
		setUser({
			id,
			basic: userBasic ?? user.basic,
			chatgpt: userChatGPT ?? user.chatgpt,
		})
	}, [id, userBasic, userChatGPT])
	
	return user
}

export const useUserId = (): ID | null => {
	const user = useUser()
	return user.id
}
