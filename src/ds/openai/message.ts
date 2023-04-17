import { ID } from '@/ds/general'
import { PlatformType } from '@/ds/openai/general'

export enum MessageType {
	text = 'text',
	image_url = 'image_url',
	
}

export enum MessageRoleType {
	system = 'system',
	user = 'user',
	assistant = 'assistant'
}

export type ChatGPTMessageRoleTYpe = MessageRoleType

export enum DalleDimensionType {
	sm = '216x216',
	md = '512x512',
	lg = '1024x1024'
}

export interface IChatGPTMessageParams {
	role: MessageRoleType
}

/**
 * todo: 目前Dalle的消息可以复用ChatGPT的数据结构（role）
 */
export interface IDalleMessageParams extends IChatGPTMessageParams {
	dimension: DalleDimensionType
}

export type IMessageParams<T extends PlatformType> =
	T extends PlatformType.chatGPT
		? IChatGPTMessageParams
		: IDalleMessageParams


export interface IMessage<T extends PlatformType> {
	conversation_id: ID
	content: string
	
	type: MessageType
	platform_type: T
	platform_params: IMessageParams<T>
	
	sender?: ID // todo: 未来做群聊需要这个
	time?: number
	
	status?: 'OK' | 'ERROR'
}
