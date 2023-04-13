import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/states/store'
import { IUserBasic, UserPlanningType, UserRole } from '@/ds/user'
import { IUserChatgpt } from '@/ds/chatgpt_v2'


export interface UserState {
	basic: IUserBasic
	chatgpt: IUserChatgpt
	alive: boolean
}


export const initialState: UserState = {
	basic: {
		id: '',
		name: '',
		email: '',
		planning: UserPlanningType.guest,
		expire: '',
		avatar: '',
		note: '',
		role: UserRole.user,
	},
	chatgpt: {
		balance: 0,
		cnt: 0,
		consumption: 0
	},
	alive: false,
}


export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserBasic: (state, action: PayloadAction<IUserBasic>) => {
			state.basic = action.payload
		},
		setUserChatgpt: (state, action: PayloadAction<IUserChatgpt>) => {
			state.chatgpt = action.payload
		},
		setUserAliveStatus: (state, action: PayloadAction<boolean>) => {
			state.alive = action.payload
		},
	},
})

export const { setUserAliveStatus, setUserChatgpt, setUserBasic } = userSlice.actions


export const selectUserId = (state: RootState) => state.user.basic.id
export const selectUserBasic = (state: RootState) => state.user.basic
export const selectUserChatgpt = (state: RootState) => state.user.chatgpt
export const selectUserAliveStatus = (state: RootState) => state.user.alive

export default userSlice
