import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/states/store'
import { IUserBasic, UserPlanning } from '@/ds/user'
import { IUserChatgpt } from '@/ds/chatgpt_v2'
import { ID } from '@/ds/general'


export interface UserState {
	id: ID | null
	basic: IUserBasic
	chatgpt: IUserChatgpt
	alive: boolean
}


export const initialState: UserState = {
	id: null,
	basic: {
		name: '',
		email: '',
		planning: UserPlanning.guest,
	},
	chatgpt: {
		balance: 0,
	},
	alive: false,
}


export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserID: (state, action: PayloadAction<ID>) => {
			state.id = action.payload
		},
		setBasicUser: (state, action: PayloadAction<IUserBasic>) => {
			state.basic = action.payload
		},
		setChatgptUser: (state, action: PayloadAction<IUserChatgpt>) => {
			state.chatgpt = action.payload
		},
		setUserAliveStatus: (state, action: PayloadAction<boolean>) => {
			state.alive = action.payload
		},
	},
})

export const { setUserAliveStatus, setUserID, setChatgptUser, setBasicUser } = userSlice.actions


export const selectUserId = (state: RootState) => state.user.id
export const selectUserBasic = (state: RootState) => state.user.basic
export const selectUserChatgpt = (state: RootState) => state.user.chatgpt
export const selectUserAliveStatus = (state: RootState) => state.user.alive

export default userSlice
