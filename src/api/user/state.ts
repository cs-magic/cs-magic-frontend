import backendApi from '@/lib/api'
import { UserState } from '@/ds/user'

export const listUserStates = async (): Promise<UserState[]> => {
	const res = await backendApi.get('/user/list')
	return res.data
}
