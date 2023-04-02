import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IChatbotConversation, IChatbotConversationBase } from '@/ds/chatgpt'
import { ID } from '@/ds/general'
import { RootState } from '@/states/store'


export type ConversationsState = {
	list: IChatbotConversationBase[]
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
		setConversations: (state, action: PayloadAction<IChatbotConversationBase[]>) => {
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
