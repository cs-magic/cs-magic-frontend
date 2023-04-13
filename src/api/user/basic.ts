import { IUserBasic } from '@/ds/user'
import backendApi from '@/lib/api'

export const updateUserBasic = async (user: IUserBasic) =>
	(await backendApi.patch('/user/basic', user)).data
