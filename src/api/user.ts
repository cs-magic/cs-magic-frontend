import { ID } from '@/ds/general'
import backendApi from '@/lib/api'
import { IUserBasic, UserPlanningType } from '@/ds/user'
import { UserState } from '@/states/features/userSlice'

export const getBasicUser = async (user_id: ID): Promise<IUserBasic> =>
	(await backendApi.get('/user/basic', { params: { user_id } })).data

export const listUsers = async (): Promise<UserState[]> => {
	const res = await backendApi.get('/user/list')
	return res.data
}

export const updateUserPlanning = async (user_id: ID, planning: UserPlanningType, expire: string, tokens: number) =>
	(await backendApi.patch('/user/planning', null, { params: { user_id, planning, expire, tokens } })).data

export const updateUserName = async (user_id: ID, name: string) =>
	(await backendApi.patch('/user/rename', null, { params: { user_id, name } })).data

export const updateUserAvatar = async (user_id: ID, avatar: string) =>
	(await backendApi.patch('/user/avatar', null, { params: { user_id, avatar } })).data
