import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { initUserState, UserState } from '@/ds/user'
import { useGetUserBasicQuery } from '@/states/apis/userApi'
import { skipToken } from '@reduxjs/toolkit/query'
import { useGetUserChatGPTQuery } from '@/states/apis/openai/chatgptApi'
import { ID } from '@/ds/general'


export const useUser = (): UserState => {
	const { data: session } = useSession()
	const [user, setUser] = useState<UserState>(initUserState)
	const id = session?.user.id
	
	const { data: userBasic } = useGetUserBasicQuery(id ?? skipToken)
	const { data: userChatGPT } = useGetUserChatGPTQuery(id ?? skipToken)
	
	useEffect(() => {
		setUser({
			basic: userBasic ?? user.basic,
			chatGPT: userChatGPT ?? user.chatGPT,
		})
	}, [userBasic, userChatGPT])
	
	return user
}

export const useUserId = (): ID | null => {
	const user = useUser()
	return user.basic.id
}
