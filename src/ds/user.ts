import { ID } from '@/ds/general'
import { IUserChatgpt } from '@/ds/chatgpt_v2'

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


export interface UserState {
	id: ID | null
	basic: IUserBasic
	chatgpt: IUserChatgpt
}

export const initUserState: UserState = {
	id: null,
	basic: {
		name: '',
		email: '',
		planning: UserPlanningType.guest,
		expire: '',
		avatar: '',
		note: '',
		role: UserRole.user,
	},
	chatgpt: {
		balance: 0,
		cnt: 0,
		consumption: 0,
	},
}
