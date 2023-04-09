import { ID } from '@/ds/general'

export enum UserPlanning {
	guest = 'guest',
	member = 'member',
	vip = 'vip',
	sVip = 'sVip',
	blackVip = 'blackVip',
}

export interface IUserBasic {
	name: string
	email: string
	planning: UserPlanning
	expire: string
	avatar: string
}

