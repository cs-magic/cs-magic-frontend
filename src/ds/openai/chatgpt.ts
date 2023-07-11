import { ID } from '@/ds/general'

export enum ChatgptRoleType {
	system = 'system',
	user = 'user',
	assistant = 'assistant'
}


export interface IChatgptMessageParams {
	role: ChatgptRoleType
}

export interface IChatgptMessage {
	role: ChatgptRoleType
	content: string
}

/**
 * 目前model是属于conversation级别的
 * 但后续也可以降级为message级别哦~
 */
export enum ChatgptModelType {
	gpt35 = 'gpt-3.5-turbo',
	gpt4 = 'gpt-4',
}

export interface IChatGPTConversationParams {
	model: ChatgptModelType,
	system_prompt: string
	// selected: ID[]
}


export interface ICallChatgpt {
	model: ChatgptModelType
	prompts: IChatgptMessage[]
}

export interface IChatgptRole {
	act: string
	prompt: string
}

export interface IComment {
	id: ID
	user_id: ID
	comment: string
	time: Date
	
	deleted: boolean
	quote: ID
}

export interface IChatgptPromptWeb {
	id: ID
	
	act: string
	prompt: string
	
	user: string
	version: string
	
	category: string
	
	social: {
		stars: number
		forks: number
		comments: IComment[]
	}
}
