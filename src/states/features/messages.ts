import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IConversation, IMessage } from '@/ds/conversation'
import { ID } from '@/ds/general'
import { RootState } from '@/states/store'


export type MessagesState = {
	list: IMessage[]
}

const initialState: MessagesState = {
	list: [],
}

export const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		setMessages: (state, action: PayloadAction<IMessage[]>) => {
			state.list = action.payload
		},
		addMessage: (state, action: PayloadAction<IMessage>) => {
			state.list.push(action.payload)
		}
	},
})

export const { setMessages, addMessage } = messagesSlice.actions

export const selectMessages = (state: RootState) => state.messages.list

export default messagesSlice
