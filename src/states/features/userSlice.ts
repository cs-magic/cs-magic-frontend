import { IUser, User } from '@/ds/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/states/store'

export interface UserSlice {
	user: User
}

const initialState: UserSlice = {
	user: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			console.log('setting user: ', action)
			state.user = action.payload
		},
		resetUser: (state) => {
			state.user = null
		},
	},
})


export const { setUser, resetUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user
