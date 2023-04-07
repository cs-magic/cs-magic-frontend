import { createAsyncThunk } from '@reduxjs/toolkit'
import { ID } from '@/ds/general'
import { setUserBalance, setUserID, setUserName, setUserType, UserPlanning } from '@/states/features/user'
import api from '@/lib/api'


export interface IUserBasic {
	id: ID
	name: string
	balance: number
	type?: UserPlanning
}

export const updateUser = createAsyncThunk('user/update', async (user_id: ID, { dispatch }) => {
	const userData: IUserBasic = (await api.get('/chatgpt/user_basic', { params: { user_id } })).data
	await dispatch(setUserName(userData.name))
	await dispatch(setUserBalance(userData.balance))
	await dispatch(setUserType(userData.type || UserPlanning.guest))
})


export const initUser = createAsyncThunk('user/init', async (user_id: ID, { dispatch }) => {
	dispatch(setUserID(user_id))
	dispatch(updateUser(user_id))
})
