import { ID } from '@/ds/general'
import backendApi from '@/lib/api'
import { IUserBasic } from '@/ds/user'
import { IChatgptConversation, IChatgptMessage, IUserChatgpt } from '@/ds/chatgpt_v2'
import { IChatgptCreateUserConversation, IChatgptUserConversation } from '@/ds/chatgpt'

//// user

export const getChatgptUser = async (user_id: ID): Promise<IUserChatgpt> => {
	const res = await backendApi.get('/chatgpt/user', { params: { user_id } })
	return res.data
}


//// conversation

export const listChatgptConversations = async (user_id: ID): Promise<IChatgptConversation[]> => {
	const res = await backendApi.get('/chatgpt/conversation/list', { params: { user_id } })
	return res.data
}

export const createChatgptConversation = async (data: IChatgptCreateUserConversation): Promise<IChatgptConversation> => {
	const res = await backendApi.post('/chatgpt/conversation/create', null, { params: data })
	return res.data
}

export const deleteChatgptConversation = async (data: IChatgptUserConversation) => {
	const res = await backendApi.delete('/chatgpt/conversation/', { params: data })
	return res.data
}

//// message

export const listChatgptMessages = async (data: IChatgptUserConversation): Promise<IChatgptMessage[]> => {
	const res = await backendApi.get('/chatgpt/message/list', {
		params: data,
	})
	return res.data
}

export const sendChatgptMessage = async (data: IChatgptUserConversation, content: string): Promise<string> => {
	const res = await backendApi.post('/chatgpt/message/chat', { content }, {
		params: data,
	})
	return res.data
}
