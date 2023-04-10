import { createAsyncThunk } from '@reduxjs/toolkit'
import { addMessage, setMessages } from '@/states/features/messageSlice'
import { AxiosError } from 'axios'
import { ChatgptRoleType } from '@/ds/chatgpt_v2'
import { createChatgptConversation, deleteChatgptConversation, listChatgptConversations, listChatgptMessages, sendChatgptMessage } from '@/api/chatgpt'
import { ID } from '@/ds/general'
import { setConversations, setConversationID } from '@/states/features/conversationSlice'
import { createAppAsyncThunk } from '@/states/hooks'
import { u } from '@/config'

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
	const messages = !conversation_id ? [] : await listChatgptMessages({ user_id, conversation_id, model })
	dispatch(setMessages(messages))
})

/**
 * - 触发时机
 *  user_id changed
 */
export const asyncSetConversations = createAsyncThunk('asyncSetConversations', async (user_id: ID, { dispatch }) => {
	const conversations = await listChatgptConversations(user_id)
	await dispatch(setConversations(conversations))
})

export const asyncDelConversation = createAppAsyncThunk('asyncDelConversation', async (conversation_id: ID, { dispatch, getState, rejectWithValue }) => {
	const conversations = getState().conversation.list
	if (!conversations.find((c) => c.id === conversation_id)) {
		return rejectWithValue(`conversation id of ${conversations} not exists!`)
	}
	const user_id = getState().user.basic.id // 没有user_id一定没有conversations
	const model = getState().conversation.model
	await deleteChatgptConversation({ user_id, conversation_id, model })
	// local update to reduce server pressure
	await dispatch(setConversations(conversations.filter((c) => c.id !== conversation_id)))
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
		const resStr = await sendChatgptMessage({ user_id, conversation_id, model }, content)
		console.log('received response string:', resStr)
		await dispatch(addMessage({ role: ChatgptRoleType.assistant, content: resStr }))
	} catch (e) {
		if (e instanceof AxiosError) {
			return rejectWithValue(e.response!.data.detail.toString())
		}
	}
})
