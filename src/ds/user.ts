import { ID } from '@/ds/general'

export enum UserPlanningType {
	guest = 'guest',
	member = 'member',
	vip = 'vip',
	sVip = 'sVip',
	blackVip = 'blackVip',
}

export interface IUserBasic {
	id: ID
	name: string
	email: string
	planning: UserPlanningType
	expire: string
	avatar: string
}

