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
	name: string
	email: string
	planning: UserPlanningType
	role: UserRole
	expire: string
	avatar: string
	note: string
}


export interface IUserOpenAI {
	balance: number
	consumption: number
	cnt: number
}

export interface IUser {
	id: ID
	basic: IUserBasic
	openai: IUserOpenAI
}

export type User = IUser | null

