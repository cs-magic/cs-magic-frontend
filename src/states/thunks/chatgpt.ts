import { createAsyncThunk } from '@reduxjs/toolkit'
import { IChatModelReq, IGetMessagesReq } from '@/ds/chatgpt'
import { addMessage, setMessages } from '@/states/features/messageSlice'
import { AxiosError } from 'axios'
import { ChatgptRoleType } from '@/ds/chatgpt_v2'
import { listChatgptConversations, listChatgptMessages, sendMessage } from '@/api/chatgpt'
import { ID } from '@/ds/general'
import { setConversations } from '@/states/features/conversationSlice'

export const initConversations = createAsyncThunk('conversations/init', async (user_id: ID, { dispatch }) => {
	const conversations = await listChatgptConversations(user_id)
	await dispatch(setConversations(conversations))
})


export const sendChat = createAsyncThunk('chat/send', async (data: IChatModelReq, { dispatch, rejectWithValue }) => {
	await dispatch(addMessage({
		time: Date.now(),
		role: ChatgptRoleType.user,
		content: data.content,
	}))
	
	console.log('sending:', data)
	try {
		const resStr = await sendMessage(data.user_id, data.conversation_id, data.model, data.content)
		console.log('received response string:', resStr)
		await dispatch(addMessage({
			time: Date.now(),
			role: ChatgptRoleType.assistant,
			content: resStr,
		}))
	} catch (e) {
		if (e instanceof AxiosError) {
			return rejectWithValue(e.response!.data.detail)
		}
	}
})
