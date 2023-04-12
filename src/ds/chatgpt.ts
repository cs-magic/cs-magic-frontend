import { ID } from '@/ds/general'
import { ChatgptRoleType } from '@/ds/chatgpt_v2'


export interface IChatgptCreateUserConversation {
	user_id: ID
	model: string
}

export interface IChatgptUserConversation extends IChatgptCreateUserConversation {
	id: ID
}

export interface IChatgptConversation extends IChatgptUserConversation{
	time: number
	start: number
	name: string
}

export type IGetMessagesReq = IChatgptUserConversation

export interface IChatModelReq {
	conversation: IChatgptUserConversation
	content: string
}

interface IChatModelResChoice {
	finish_reason: string
	index: number
	message: {
		content: string
		role: ChatgptRoleType
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
