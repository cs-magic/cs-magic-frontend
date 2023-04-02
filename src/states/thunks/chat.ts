import { createAsyncThunk } from '@reduxjs/toolkit'
import { IMessage, RoleType } from '@/ds/conversation'
import { v4 } from 'uuid'
import { addMessage } from '@/states/features/messages'
import api from '@/lib/api'
import { IChatModel } from '@/components/shared/CompChatBox'


export const sendChat = createAsyncThunk('chat/send', async (data: IChatModel, { dispatch }) => {
	const { conversation_id } = data
	await dispatch(addMessage({
		id: v4(),
		conversation_id,
		time: Date.now(),
		role: RoleType.user,
		content: data.content,
	}))
	
	console.log('sending:', data)
	const res = await api.post('/chatgpt/chat', data)
	const receivedMessage = res.data
	console.log('received response:', receivedMessage)
	await dispatch(addMessage({
		id: v4(),
		conversation_id,
		time: Date.now(),
		role: RoleType.assistant,
		content: receivedMessage,
	}))
})
