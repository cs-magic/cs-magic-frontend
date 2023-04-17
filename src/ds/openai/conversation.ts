import { ID } from '@/ds/general'
import { PlatformType } from '@/ds/openai/general'

/**
 * 目前model是属于conversation级别的
 * 但后续也可以降级为message级别哦~
 */
export enum ChatgptModelType {
	gpt35 = 'gpt-3.5-turbo',
	gpt4 = 'gpt-4',
}

export interface IBaseCreateConversation<T extends PlatformType, P extends {}> {
	user_id: ID
	platform_type: T
	platform_params: P
}

export interface IBaseConversation<T extends PlatformType, P extends {}> extends IBaseCreateConversation<T, P> {
	id: ID
	name?: string
	time?: string
}

export interface IChatGPTConversationParams {
	model: ChatgptModelType,
	selected: ID[]
}

export interface IDalleConversationParams {
}

export type IConversationParams<T extends PlatformType> = T extends PlatformType.chatGPT
	? IChatGPTConversationParams
	: IDalleConversationParams


export type IConversation<T extends PlatformType> = IBaseConversation<T, IConversationParams<T>>
export type ICreateConversation<T extends PlatformType> = IBaseCreateConversation<T, IConversationParams<T>>


