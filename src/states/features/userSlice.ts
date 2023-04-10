import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/states/store'
import { IUserBasic, UserPlanningType } from '@/ds/user'
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
		setUserBasic: (state, action: PayloadAction<IUserBasic>) => {
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

export const { setUserAliveStatus, setChatgptUser, setUserBasic } = userSlice.actions


export const selectUserId = (state: RootState) => state.user.basic.id
export const selectUserBasic = (state: RootState) => state.user.basic
export const selectUserChatgpt = (state: RootState) => state.user.chatgpt
export const selectUserAliveStatus = (state: RootState) => state.user.alive

export default userSlice
