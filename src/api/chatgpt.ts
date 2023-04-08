import { ID } from '@/ds/general'
import backendApi from '@/lib/api'
import { IUserBasic } from '@/ds/user'
import { IChatgptConversation, IChatgptMessage, IUserChatgpt } from '@/ds/chatgpt_v2'

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

export const createChatgptConversation = async (user_id: ID, model: string): Promise<IChatgptConversation> => {
	const res = await backendApi.post('/chatgpt/conversation/create', null, { params: { user_id, model } })
	return res.data
}

//// message

export const listChatgptMessages = async (user_id: ID, conversation_id: ID, model: string): Promise<IChatgptMessage[]> => {
	const res = await backendApi.get('/chatgpt/message/list', {
		params: { user_id, conversation_id, model },
	})
	return res.data
}

export const sendMessage = async (user_id: ID, conversation_id: ID, model: string, content: string): Promise<string> => {
	const res = await backendApi.post('/chatgpt/message/chat', { content }, {
		params: { user_id, conversation_id, model },
	})
	return res.data
}
