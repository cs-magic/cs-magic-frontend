import { ID } from '@/ds/general'

export enum ChatgptRoleType {
	system = 'system',
	user = 'user',
	assistant = 'assistant'
}

export type ChatgptModelType = 'gpt-3.5-turbo' | 'gpt-4'

export interface IChatgptMessageCore {
	role: ChatgptRoleType
	content: string
}
export interface IChatgptMessage extends IChatgptMessageCore{
	time: number
}

export interface IChatgptConversation {
	id: ID
	user_id: ID
	model: string
	time: number
	start: number
}

export interface IUserChatgpt {
	balance: number
}
