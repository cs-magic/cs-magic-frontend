import { ID } from '@/ds/general'
import backendApi from '@/lib/api'
import { IChatgptConversation, IChatgptMessage, IUserChatgpt } from '@/ds/chatgpt_v2'
import { IChatgptCreateUserConversation, IChatgptUserConversation } from '@/ds/chatgpt'

//// user

export const getUserChatgpt = async (user_id: ID): Promise<IUserChatgpt> =>
	(await backendApi.get('/chatgpt/user/', { params: { user_id } })).data

export const updateUserChatgpt = async (user: IUserChatgpt) =>
	(await backendApi.patch('/chatgpt/user/', user)).data

//// conversation

export const listChatgptConversations = async (user_id: ID): Promise<IChatgptConversation[]> =>
	(await backendApi.get('/chatgpt/conversation/list', { params: { user_id } })).data

export const createChatgptConversation = async (data: IChatgptCreateUserConversation): Promise<IChatgptConversation> =>
	(await backendApi.post('/chatgpt/conversation/create', null, { params: data })).data

export const deleteChatgptConversation = async (data: IChatgptUserConversation) =>
(await backendApi.delete('/chatgpt/conversation/', { params: data })).data

export const updateChatgptConversationName = async (data: IChatgptUserConversation, name: string) =>
	(await backendApi.patch('/chatgpt/conversation/name', null, { params: { ...data, name } })).data

//// message

export const listChatgptMessages = async (data: IChatgptUserConversation): Promise<IChatgptMessage[]> =>
	(await backendApi.get('/chatgpt/message/list', { params: data, })).data

// todo: sync
export const postChatgptMessage = async (data: IChatgptUserConversation, content: string, stream: boolean = true) => {
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
