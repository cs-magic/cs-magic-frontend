import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IConversation, IMessage } from '@/ds/conversation'
import { ID } from '@/ds/general'


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
	},
})

export const { setMessages } = messagesSlice.actions

export default messagesSlice
