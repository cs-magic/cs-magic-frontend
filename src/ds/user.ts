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
	name: string | null
	email: string | null
	membership: {
		planning: UserPlanningType
		expire: string | null
	}
	role: UserRole
	avatar: string | null
	note: string | null
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

