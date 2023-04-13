import { ID } from '@/ds/general'


export interface IChatgptCreateUserConversation {
	user_id: ID
	model: string
}


export interface IChatgptConversation extends IChatgptCreateUserConversation {
	id: ID
	time: number
	start?: number
	name: string
}


export enum RoleType {
	system = 'system',
	user = 'user',
	assistant = 'assistant'
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

export const CHATGPT_MODEL_35_TURBO = 'gpt-3.5-turbo'
export const CHATGPT_MODEL_4 = 'gpt-4'
export const chatgptModelTypes = [CHATGPT_MODEL_4, CHATGPT_MODEL_35_TURBO]
export type ChatgptModelType = typeof chatgptModelTypes[number]
