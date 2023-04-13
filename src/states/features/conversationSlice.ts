import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ID } from '@/ds/general'
import { RootState } from '@/states/store'
import { ChatgptModelType } from '@/ds/chatgpt_v2'


export type ConversationsState = {
	cur: ID | null
	model: ChatgptModelType
}


const initialState: ConversationsState = {
	cur: null,
	model: 'gpt-3.5-turbo',
}


export const conversationSlice = createSlice({
	name: 'conversation',
	initialState,
	reducers: {
		setConversationID: (state, action: PayloadAction<ID | null>) => {
			state.cur = action.payload
		},
		setChatgptModelType: (state, action: PayloadAction<ChatgptModelType>) => {
			state.model = action.payload
		},
	},
})

export const { setConversationID, setChatgptModelType } = conversationSlice.actions

export const selectChatgptConversationID = (state: RootState) => state.conversation.cur
export const selectChatgptModelType = (state: RootState) => state.conversation.model

export default conversationSlice
