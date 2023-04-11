import { ID } from '@/ds/general'
import { setUserBasic } from '@/states/features/userSlice'
import { getUserBasic } from '@/api/user/basic'
import { asyncUpdateUserChatgpt } from '@/states/thunks/chatgpt'
import { createAppAsyncThunk } from '@/states/hooks'


export const initUser = createAppAsyncThunk('user/init', async (user_id: ID, { dispatch }) => {
	await dispatch(setUserBasic(await getUserBasic(user_id)))
	await dispatch(asyncUpdateUserChatgpt())
})

