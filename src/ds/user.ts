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
	id: ID | null
	name: string
	email: string
	planning: UserPlanningType
	role: UserRole
	expire: string
	avatar: string
	note: string
}


export interface UserState {
	basic: IUserBasic
	chatGPT: IUserChatgpt
}

export const initUserState: UserState = {
	basic: {
		id: null,
		name: '',
		email: '',
		planning: UserPlanningType.guest,
		expire: '',
		avatar: '',
		note: '',
		role: UserRole.user,
	},
	chatGPT: {
		balance: 0,
		cnt: 0,
		consumption: 0,
	},
}
