import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/states/store'
import { authApi } from '@/states/api/authApi'

export interface AuthSlice {
	token: string | null
	username: string | null
}

export const initialState: AuthSlice = {
	token: null,
	username: null,
}

export const authSlice = createSlice({
		name: 'auth',
		initialState,
		reducers: {
			reset: (state) => {
				state.token = null
				state.username = null
			},
		},
		extraReducers: (builder) => {
			builder.addMatcher(
				authApi.endpoints.grantToken.matchFulfilled,
				(state, action) => {
					state.token = action.payload.access_token
					state.username = action.meta.arg.originalArgs.username
					console.log('action: ', action)
				},
			)
		},
	},
)


export const { reset } = authSlice.actions

export const selectToken = (state: RootState) => state.auth.token
