import { ID } from '@/ds/general'

export type ChatgptModelType = 'gpt-3.5-turbo' | 'gpt-4'

export enum ContentType {
	text = 'text',
	image_url = 'image_url',
	
}

export enum ModelPlatformType {
	chatgpt = 'chatGPT',
	dalle = 'dalle',
}

export enum RoleType {
	system = 'system',
	user = 'user',
	assistant = 'assistant'
}

export interface IChatMessage {
	time: number
	user_id: ID // 为 update token 方便
	conversation_id: ID
	
	content: string
	role: RoleType
	content_type: ContentType
	model_platform: ModelPlatformType
}

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


export interface IChatGPTConversation extends ICreateChatGPTConversation {
	start?: number
}


export interface IUserOpenAI {
	balance: number
	consumption: number
	cnt: number
}
