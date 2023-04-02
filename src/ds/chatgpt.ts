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

export interface IChatModelReq {
	user_id: ID
	conversation_id?: ID
	model: string
	content: string
}

interface IChatModelResChoice {
	finish_reason: string
	index: number
	message: {
		content: string
		role: RoleType
	}
}

export interface IChatModelResUsage {
		completion_tokens: number
		prompt_tokens: number
		total_tokens: number
	}

export interface IChatModelRes {
	choices: IChatModelResChoice[]
	created: number // 1680439050
	id: ID
	model: string
	object: string
	usage: IChatModelResUsage
}

export interface IUserConversation {
	user_id: ID
	conversation_id?: ID
}

export const CHATGPT_MODEL_35_TURBO = 'gpt-3.5-turbo'
export const CHATGPT_MODEL_4 = 'gpt-4'
export const chatgptModelTypes = [CHATGPT_MODEL_4, CHATGPT_MODEL_35_TURBO]
export type ChatgptModelType = typeof chatgptModelTypes[number]
