import { ID } from '@/ds/general'
import { ModelPlatformType } from '@/ds/message'


export interface ICreateConversation {
	user_id: ID
	name?: string
	time?: string
	id?: ID
	model_platform?: ModelPlatformType
}


export interface ICreateChatGPTConversation extends ICreateConversation {
	model: string
}

export interface ICreateDalleConversation extends ICreateConversation {

}

export interface IChatGPTConversation extends ICreateChatGPTConversation {
	start?: number
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
