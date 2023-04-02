import { createAsyncThunk } from '@reduxjs/toolkit'
import { ID } from '@/ds/general'
import { setUserID, setUserName, setUserBalance } from '@/states/features/user'
import api from '@/lib/api'


export interface IUserBasic {
	id: ID
	name: string
	balance: number
}

export const initUser = createAsyncThunk('user/init', async (user_id: ID, {dispatch}) => {
	dispatch(setUserID(user_id))
	const userData: IUserBasic = (await api.get('/chatgpt/user_basic', {params: {user_id}})).data
	dispatch(setUserName(userData.name))
	dispatch(setUserBalance(userData.balance))
})
