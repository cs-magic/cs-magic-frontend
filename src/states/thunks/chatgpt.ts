import { addMessage, setMessages } from '@/states/features/messageSlice'
import { AxiosError } from 'axios'
import { ChatgptRoleType, IUserChatgpt } from '@/ds/chatgpt_v2'
import { createChatgptConversation, getUserChatgpt, listChatgptMessages, postChatgptMessage } from '@/api/chatgpt'
import { ID } from '@/ds/general'
import { setConversationID } from '@/states/features/conversationSlice'
import { createAppAsyncThunk } from '@/states/hooks'
import { u } from '@/config'
import { setUserChatgpt } from '@/states/features/userSlice'


// use void, ref: https://stackoverflow.com/a/67970314/9422455
export const asyncUpdateUserChatgpt = createAppAsyncThunk('asyncUpdateChatgpt', async (arg: void, { dispatch, getState }) => {
	const user_id = getState().user.basic.id
	const user_chatgpt: IUserChatgpt = await getUserChatgpt(user_id)
	dispatch(setUserChatgpt(user_chatgpt))
})

/**
 * - 前置条件（重要）
 *  - user 要先存在
 *
 * - 触发时机
 *  1. conversation page uri changed
 *  2. send first message on default conversation page
 */
export const asyncSetConversationID = createAppAsyncThunk('asyncSetConversationID', async (conversation_id: ID | null, { dispatch, getState }) => {
	const user_id = getState().user.basic.id
	const model = getState().conversation.model
	
	if (!user_id) return
	
	dispatch(setConversationID(conversation_id))
	const messages = !conversation_id ? [] : await listChatgptMessages({ user_id, id: conversation_id, model })
	dispatch(setMessages(messages))
})

export const asyncSendMessage = createAppAsyncThunk('asyncSendMessage', async (content: string, { dispatch, getState, rejectWithValue }) => {
	if (!content) {
		return rejectWithValue(u.notify.errorSendEmpty)
	}
	
	const user_id = getState().user.basic.id
	if (!user_id) {
		return rejectWithValue(u.notify.errorUserEmpty)
	}
	
	const model = getState().conversation.model
	let conversation_id = getState().conversation.cur
	if (!conversation_id) {
		conversation_id = (await createChatgptConversation({ user_id, model })).id
		dispatch(setConversationID(conversation_id))
		console.log(`conversation empty, auto-created to be ${conversation_id}`)
	}
	
	await dispatch(addMessage({ role: ChatgptRoleType.user, content: content }))
	console.log('sending message: ', { conversation_id, model, content })
	
	try {
		// const resStr = await sendChatgptMessage({ user_id, conversation_id, model }, content, true)
		// console.log('received response string:', resStr)
		// await dispatch(addMessage({ role: ChatgptRoleType.assistant, content: resStr }))
		
		const contentA = await postChatgptMessage({ user_id, id: conversation_id, model }, content, true)
		console.log('received: ', contentA)
		await dispatch(addMessage({ role: ChatgptRoleType.assistant, content: contentA }))
		// 在获得消息返回之后，就更新chatgpt balance
		await dispatch(asyncUpdateUserChatgpt())
		
	} catch (e) {
		if (e instanceof AxiosError) {
			return rejectWithValue(e.response!.data.detail.toString())
		}
	}
})
