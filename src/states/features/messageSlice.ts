import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/states/store'
import { IChatgptMessage } from '@/ds/chatgpt_v2'


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
		addMessage: (state, action: PayloadAction<IChatgptMessage>) => {
			state.list.push(action.payload)
		},
	},
})

export const { setMessages, addMessage } = messageSlice.actions

export const selectMessages = (state: RootState) => state.messages.list

export default messageSlice
