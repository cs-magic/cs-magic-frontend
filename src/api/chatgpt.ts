import { ID } from '@/ds/general'
import backendApi from '@/lib/api'
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

export const updateChatgptConversationName = async (data: IChatgptUserConversation, name: string) => {
	const res = await backendApi.patch('/chatgpt/conversation/name', null, { params: { ...data, name } })
	return res.data
}

//// message

export const listChatgptMessages = async (data: IChatgptUserConversation): Promise<IChatgptMessage[]> => {
	const res = await backendApi.get('/chatgpt/message/list', {
		params: data,
	})
	return res.data
}

// todo: sync
export const asyncSendChatgptMessage = async (data: IChatgptUserConversation, content: string, stream: boolean = true) => {
	const res = await backendApi.post('/chatgpt/message/chat', { content }, {
		params: { ...data, stream },
		responseType: 'stream',
	})
	// // ref: https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams#consuming_a_fetch_using_asynchronous_iteration
	// for await (const chunk of res.data) {
	// 	console.log({ chunk })
	// }
	return res.data
}
