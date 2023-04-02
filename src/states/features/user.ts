import { ID } from '@/ds/general'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/states/store'

export interface UserState {
	id: ID
	alive: boolean
}


export const initialState: UserState = {
	// todo: dynamic
	id: 'test-user-001',
	alive: false,
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
	},
})

export const { setUserID, setUserAliveStatus } = userSlice.actions


export const selectUserID = (state: RootState) => state.user.id
export const selectUserAliveStatus = (state: RootState) => state.user.alive

export default userSlice
