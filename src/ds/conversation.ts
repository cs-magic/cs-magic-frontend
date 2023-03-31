import { ID } from '@/ds/general'
import { IUser } from '@/ds/user'

export enum RoleType {
	system = 'system',
	user = 'user',
	assistant = 'assistant'
}

export interface IMessage {
	id: ID
	conversation_id: ID
	time: number
	
	role: RoleType
	content: string
}


export interface IConversation {
	id: ID
	title?: string
}
