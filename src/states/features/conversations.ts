import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IChatbotConversation } from '@/ds/conversation'
import { ID } from '@/ds/general'
import { RootState } from '@/states/store'


export type ConversationsState = {
	list: IChatbotConversation[]
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
		setConversations: (state, action: PayloadAction<IChatbotConversation[]>) => {
			state.list = action.payload
		},
		setCurConversation: (state, action: PayloadAction<ID | null>) => {
			state.cur = action.payload
		},
	},
})

export const { setConversations, setCurConversation } = conversationsSlice.actions

export const selectConversations = (state: RootState) => state.conversations.list

export default conversationsSlice
