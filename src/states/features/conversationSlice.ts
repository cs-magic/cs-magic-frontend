import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ID } from '@/ds/general'
import { RootState } from '@/states/store'
import { IChatgptConversation } from '@/ds/chatgpt_v2'


export type ConversationsState = {
	list: IChatgptConversation[]
	cur: ID | null
}


const initialState: ConversationsState = {
	list: [],
	cur: null,
}


export const conversationSlice = createSlice({
	name: 'conversation',
	initialState,
	reducers: {
		setConversations: (state, action: PayloadAction<IChatgptConversation[]>) => {
			state.list = action.payload
		},
		setCurConversationID: (state, action: PayloadAction<ID | null>) => {
			state.cur = action.payload
		},
	},
})

export const { setConversations, setCurConversationID } = conversationSlice.actions

export const selectConversations = (state: RootState) => state.conversation.list
export const selectConversationID = (state: RootState) => state.conversation.cur

export default conversationSlice
