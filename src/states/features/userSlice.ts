import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/states/store'
import { initUserState, IUserBasic } from '@/ds/user'
import { IUserChatgpt } from '@/ds/chatgpt_v2'


export const userSlice = createSlice({
	name: 'user',
	initialState: initUserState,
	reducers: {
		setUserBasic: (state, action: PayloadAction<IUserBasic>) => {
			state.basic = action.payload
		},
		setUserChatgpt: (state, action: PayloadAction<IUserChatgpt>) => {
			state.chatgpt = action.payload
		},
	},
})

export const { setUserChatgpt, setUserBasic } = userSlice.actions


export const selectUserId = (state: RootState) => state.user.basic.id
export const selectUserBasic = (state: RootState) => state.user.basic
export const selectUserChatgpt = (state: RootState) => state.user.chatGPT

export default userSlice
