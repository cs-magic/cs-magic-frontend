import { createAsyncThunk } from '@reduxjs/toolkit'
import { IChatbotConversation, IChatbotConversationBase, IChatModelReq, IChatModelRes, IUserConversation, RoleType } from '@/ds/chatgpt'
import { v4 } from 'uuid'
import { addMessage, setMessages } from '@/states/features/messagesSlice'
import api from '@/lib/api'
import { ID } from '@/ds/general'
import { setConversations } from '@/states/features/conversationsSlice'
import instance from '@/lib/api'
import { instanceOf } from 'prop-types'
import { AxiosError } from 'axios'


export const fetchConversations = createAsyncThunk('chat/conversations', async (user_id: ID, { dispatch }) => {
	const res = await api.get('/chatgpt/conversations', {
		params: {
			user_id,
		},
	})
	const conversations = res.data as IChatbotConversationBase[]
	dispatch(setConversations(conversations))
})

export const fetchMessages = createAsyncThunk('chat/conversation', async (data: IUserConversation, { dispatch }) => {
	if (!data.conversation_id) return []
	const res = await api.get('/chatgpt/conversation', {
		params: data,
	})
	const conversation = res.data as IChatbotConversation
	dispatch(setMessages(conversation.messages))
})


export const sendChat = createAsyncThunk('chat/send', async (data: IChatModelReq, { dispatch, rejectWithValue }) => {
	const { conversation_id } = data
	await dispatch(addMessage({
		id: v4(),
		conversation_id,
		time: Date.now(),
		role: RoleType.user,
		content: data.content,
	}))
	
	console.log('sending:', data)
	try {
		const res = await api.post('/chatgpt/chat', data)
		const receivedMessage = res.data as IChatModelRes
		console.log('received response:', receivedMessage)
		await dispatch(addMessage({
			id: v4(),
			conversation_id,
			time: Date.now(),
			role: RoleType.assistant,
			content: receivedMessage.choices[0].message.content,
		}))
	} catch (e) {
		if (e instanceof AxiosError) {
			return rejectWithValue(e.response!.data.detail)
		}
	}
	
	
})
