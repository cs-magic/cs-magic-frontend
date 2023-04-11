import { ID } from '@/ds/general'

export enum UserPlanningType {
	guest = 'guest',
	member = 'member',
	vip = 'vip',
	sVip = 'sVip',
	blackVip = 'blackVip',
}

export enum UserRole {
	user = 'user',
	admin = 'admin',
}

export interface IUserBasic {
	id: ID
	name: string
	email: string
	planning: UserPlanningType
	role: UserRole
	expire: string
	avatar: string
	note: string
}


