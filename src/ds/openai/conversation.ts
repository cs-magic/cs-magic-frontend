import { ID } from '@/ds/general'
import { PlatformType } from '@/ds/openai/general'
import { IChatGPTConversationParams } from '@/ds/openai/chatgpt'

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

export type IConversationParams = IChatGPTConversationParams


export type IConversation<T extends PlatformType> = IBaseConversation<T, IConversationParams>
export type ICreateConversation<T extends PlatformType> = IBaseCreateConversation<T, IConversationParams>


