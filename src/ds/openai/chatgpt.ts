import { ID, MessageStatusType, MessageType } from '@/ds/general'
import { PlatformType } from '@/ds/openai/index'
import { ISocial } from '@/ds/social'

export enum ChatgptRoleType {
	system = 'system',
	user = 'user',
	assistant = 'assistant'
}


export interface IChatgptMessageParams {
	role: ChatgptRoleType
}


/**
 * 目前model是属于conversation级别的
 * 但后续也可以降级为message级别哦~
 */
export enum ChatgptModelType {
	gpt_35 = 'gpt-3.5-turbo',
	gpt_35_0301 = 'gpt-3.5-turbo-0301',
	gpt_35_0613 = 'gpt-3.5-turbo-0613',
	gpt_4 = 'gpt-4',
	gpt_4_0314 = 'gpt-4-0314',
	gpt_4_0613 = 'gpt-4-0613',
}

export interface IChatGPTConversationParams {
	model: ChatgptModelType,
	system_prompt?: string
	// selected: ID[]
}


export interface ICallChatgpt {
	model: ChatgptModelType
	prompts: {
		role: ChatgptRoleType
		content: string
	}[]
}


export type IChatgptMessage = {
	conversation_id: ID
	sender: ID // todo: 未来做群聊需要这个
	content: string
	
	type: MessageType
	platform_type: PlatformType.chatGPT
	platform_params: IChatgptMessageParams
	
	time: number
	
	status?: MessageStatusType
}

export type IChatgptConversationCreate = {
	user_id: ID
	platform_type: PlatformType.chatGPT
	platform_params: IChatGPTConversationParams
}

export interface IChatgptConversation extends IChatgptConversationCreate {
	id: ID
	name?: string
	time?: string
	
	social: ISocial
}
