import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ID } from '@/ds/general'
import { RootState } from '@/states/store'
import { ChatgptModelType, IChatgptConversation } from '@/ds/chatgpt_v2'


export type ConversationsState = {
	list: IChatgptConversation[]
	cur: ID | null
	model: ChatgptModelType
}


const initialState: ConversationsState = {
	list: [],
	cur: null,
	model: 'gpt-3.5-turbo'
}


export const conversationSlice = createSlice({
	name: 'conversation',
	initialState,
	reducers: {
		setConversations: (state, action: PayloadAction<IChatgptConversation[]>) => {
			state.list = action.payload
		},
		setConversationID: (state, action: PayloadAction<ID | null>) => {
			state.cur = action.payload
		},
		setChatgptModelType: (state, action: PayloadAction<ChatgptModelType>) => {
			state.model = action.payload
		}
	},
})

export const { setConversations, setConversationID, setChatgptModelType } = conversationSlice.actions

export const selectConversations = (state: RootState) => state.conversation.list
export const selectChatgptConversationID = (state: RootState) => state.conversation.cur
export const selectChatgptModelType = (state: RootState) => state.conversation.model

export default conversationSlice
