import { ID } from '@/ds/general'

export enum RoleType {
	system = 'system',
	user = 'user',
	assistant = 'assistant'
}

export interface IMessage {
	id: ID
	conversation_id?: ID
	time: number
	
	role: RoleType
	content: string
}


export interface IChatbotConversationBase {
	id: ID
	name: string
}

export interface IChatbotConversation extends IChatbotConversationBase {
	user_id: ID
	model: string
	messages: IMessage[]
	start: number
}

export interface IChatModel {
	user_id: ID
	conversation_id?: ID
	model: string
	content: string
}
