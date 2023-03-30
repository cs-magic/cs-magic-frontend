import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IConversation } from '@/ds/conversation'
import { ID } from '@/ds/general'


export type ConversationsState = {
	list: IConversation[]
	cur: ID | null
}


const initialState: ConversationsState = {
	list: [],
	cur: null,
}


export const conversationsSlice = createSlice({
	name: 'conversations',
	initialState,
	reducers: {
		setConversations: (state, action: PayloadAction<IConversation[]>) => {
			state.list = action.payload
			state.
		}
	},
})

export const { setConversations } = conversationsSlice.actions

export default conversationsSlice
