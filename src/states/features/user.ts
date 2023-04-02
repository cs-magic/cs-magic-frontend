import { ID } from '@/ds/general'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/states/store'

export interface UserState {
	id: ID | null
	alive: boolean
	name: string
	balance: number
}


export const initialState: UserState = {
	// todo: dynamic
	id: null,
	alive: false,
	name: 'Unnamed',
	balance: 0,
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
		}
	},
})

export const { setUserID, setUserAliveStatus, setUserBalance, setUserName } = userSlice.actions


export const selectUser = (state: RootState) => state.user
export const selectUserID = (state: RootState) => state.user.id
export const selectUserAliveStatus = (state: RootState) => state.user.alive

export default userSlice
