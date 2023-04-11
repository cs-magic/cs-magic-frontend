import { IUserBasic } from '@/ds/user'
import backendApi from '@/lib/api'
import { ID } from '@/ds/general'

export const getUserBasic = async (user_id: ID): Promise<IUserBasic> =>
	(await backendApi.get('/user/basic', { params: { user_id } })).data

export const updateUserBasic = async (user: IUserBasic) =>
	(await backendApi.patch('/user/basic', null, { params: user })).data
