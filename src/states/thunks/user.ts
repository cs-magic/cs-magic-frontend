import { createAsyncThunk } from '@reduxjs/toolkit'
import { ID } from '@/ds/general'
import { getChatgptUser } from '@/api/chatgpt'
import { setChatgptUser, setUserBasic } from '@/states/features/userSlice'
import { getUserBasic } from '@/api/user/basic'


export const updateChatgptUser = createAsyncThunk('user/update-chatgpt', async (user_id: ID, { dispatch }) => {
	await dispatch(setChatgptUser(await getChatgptUser(user_id)))
})


export const initUser = createAsyncThunk('user/init', async (user_id: ID, { dispatch }) => {
	await dispatch(setUserBasic(await getUserBasic(user_id)))
	await dispatch(updateChatgptUser(user_id))
})

