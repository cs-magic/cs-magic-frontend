import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/states/store'
import { IChatgptMessage, IChatgptMessageCore } from '@/ds/chatgpt_v2'
import { RoleType } from '@/ds/chatgpt'


export type MessagesState = {
	list: IChatgptMessage[]
}

const initialState: MessagesState = {
	list: [],
}

export const messageSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		setMessages: (state, action: PayloadAction<IChatgptMessage[]>) => {
			state.list = action.payload
		},
		addMessage: (state, action: PayloadAction<IChatgptMessageCore>) => {
			state.list.push({ ...action.payload, time: Date.now() })
		},
		updateStreamingMessage: (state, action: PayloadAction<string>) => {
			const lastMessage = state.list[state.list.length - 1]
			if (lastMessage.role !== RoleType.assistant) {
				state.list.push({ role: RoleType.assistant, content: action.payload, time: Date.now() })
			} else {
				lastMessage.content += action.payload
			}
		},
	},
})

export const { setMessages, addMessage, updateStreamingMessage } = messageSlice.actions

export const selectChatgptMessages = (state: RootState) => state.messages.list

export default messageSlice
