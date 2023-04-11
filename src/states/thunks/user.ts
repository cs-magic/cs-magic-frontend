import { createAsyncThunk } from '@reduxjs/toolkit'
import { ID } from '@/ds/general'
import { getUserChatgpt } from '@/api/chatgpt'
import { setUserChatgpt, setUserBasic } from '@/states/features/userSlice'
import { getUserBasic } from '@/api/user/basic'


export const updateChatgptUser = createAsyncThunk('user/update-chatgpt', async (user_id: ID, { dispatch }) => {
	await dispatch(setUserChatgpt(await getUserChatgpt(user_id)))
})


export const initUser = createAsyncThunk('user/init', async (user_id: ID, { dispatch }) => {
	await dispatch(setUserBasic(await getUserBasic(user_id)))
	await dispatch(updateChatgptUser(user_id))
})

