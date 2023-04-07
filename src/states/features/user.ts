import { ID } from '@/ds/general'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/states/store'

export enum UserType {
	guest = 'guest',
	register = 'register',
	vip = 'vip',
	vipGolden = 'vipGolden',
	vipPlatinum = 'vipPlatinum',
	vipDiamond = 'vipDiamond'
}

export interface UserState {
	id: ID | null
	alive: boolean
	name: string
	balance: number,
	type: UserType,
	
}


export const initialState: UserState = {
	// todo: dynamic
	id: null,
	alive: false,
	name: 'Unnamed',
	balance: 0,
	type: UserType.guest,
}


export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserID: (state, action: PayloadAction<ID>) => {
			state.id = action.payload
		},
		setUserAliveStatus: (state, action: PayloadAction<boolean>) => {
			state.alive = action.payload
		},
		setUserBalance: (state, action: PayloadAction<number>) => {
			state.balance = action.payload
		},
		setUserName: (state, action: PayloadAction<string>) => {
			state.name = action.payload
		},
		setUserType: (state, action: PayloadAction<UserType>) => {
			state.type = action.payload
		},
	},
})

export const { setUserID, setUserAliveStatus, setUserBalance, setUserName, setUserType } = userSlice.actions


export const selectUser = (state: RootState) => state.user
export const selectUserID = (state: RootState) => state.user.id
export const selectUserAliveStatus = (state: RootState) => state.user.alive

export default userSlice
