import { UserState } from '@/states/features/userSlice'
import backendApi from '@/lib/api'

export const listUserStates = async (): Promise<UserState[]> => {
	const res = await backendApi.get('/user/list')
	return res.data
}
