import { ID } from '@/ds/general'

export enum ChatgptRoleType {
	system = 'system',
	user = 'user',
	assistant = 'assistant'
}

export interface IChatgptMessage {
	time: number
	role: ChatgptRoleType
	content: string
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
