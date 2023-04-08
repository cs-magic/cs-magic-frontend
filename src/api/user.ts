import { ID } from '@/ds/general'
import backendApi from '@/lib/api'
import { IUserBasic } from '@/ds/user'

export const getBasicUser = async (user_id: ID): Promise<IUserBasic> => {
	const res = await backendApi.get('/user/basic', { params: { user_id } })
	return res.data
}
