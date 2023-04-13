import { RoleType } from '@/ds/chatgpt'

export type ChatgptModelType = 'gpt-3.5-turbo' | 'gpt-4'

export interface IChatgptMessageCore {
	role: RoleType
	content: string
}
export interface IChatgptMessage extends IChatgptMessageCore{
	time: number
}

export interface IUserChatgpt {
	balance: number
	consumption: number
	cnt: number
}
