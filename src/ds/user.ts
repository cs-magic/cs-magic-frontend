import { ID } from '@/ds/general'

export enum UserPlanning {
	guest = 'guest',
	normal = 'normal',
	vip = 'vip',
	sVip = 'sVip',
	blackVip = 'blackVip',
}

export interface IUserBasic {
	id: ID
	name: string
	email: string
	planning: UserPlanning
	expire: string
}

