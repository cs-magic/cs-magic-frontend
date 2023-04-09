import { createAsyncThunk } from '@reduxjs/toolkit'
import { ID } from '@/ds/general'
import { getChatgptUser } from '@/api/chatgpt'
import { setUserBasic, setChatgptUser, setUserID } from '@/states/features/userSlice'
import { getBasicUser } from '@/api/user'


export const updateChatgptUser = createAsyncThunk('user/update-chatgpt', async (user_id: ID, { dispatch }) => {
	await dispatch(setChatgptUser(await getChatgptUser(user_id)))
})


export const initUser = createAsyncThunk('user/init', async (user_id: ID, { dispatch }) => {
	await dispatch(setUserID(user_id))
	await dispatch(setUserBasic(await getBasicUser(user_id)))
	await dispatch(updateChatgptUser(user_id))
})

