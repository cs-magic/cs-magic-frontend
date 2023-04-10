import { ID } from '@/ds/general'
import backendApi from '@/lib/api'
import { IUserBasic, UserPlanningType } from '@/ds/user'

export const getBasicUser = async (user_id: ID): Promise<IUserBasic> =>
	(await backendApi.get('/user/basic', { params: { user_id } })).data

export const listUsers = async (): Promise<IUserBasic> =>
	(await backendApi.get('/user/list')).data

export const updateUserPlanning = async (user_id: ID, planning: UserPlanningType, expire: string) =>
	(await backendApi.patch('/user/planning', null, { params: { user_id, planning, expire } })).data

export const updateUserName = async (user_id: ID, name: string) =>
	(await backendApi.patch('/user/rename', null, { params: { user_id, name } })).data

export const updateUserAvatar = async (user_id: ID, avatar: string) =>
	(await backendApi.patch('/user/avatar', null, { params: { user_id, avatar } })).data
