import { ID } from '@/ds/general'
import backendApi from '@/lib/api'
import { IUserChatgpt } from '@/ds/chatgpt_v2'

//// user
export const updateUserChatgpt = async (user: IUserChatgpt) =>
	(await backendApi.patch('/openai/user/', user)).data
