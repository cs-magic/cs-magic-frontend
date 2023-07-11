import { ID, MessageStatusType } from '@/ds/general'
import { PlatformType } from '@/ds/openai/general'
import { IChatgptMessageParams } from '@/ds/openai/chatgpt'
import { IDalleMessageParams } from '@/ds/openai/dalle'

export enum MessageType {
	text = 'text',
	image_url = 'image_url',
}

export type IMessageParams<T extends PlatformType> =
	T extends PlatformType.chatGPT
		? IChatgptMessageParams
		: IDalleMessageParams

export interface IMessage<T extends PlatformType> {
	conversation_id: ID
	content: string
	
	type: MessageType
	platform_type: T
	platform_params: IMessageParams<T>
	
	sender: ID // todo: 未来做群聊需要这个
	time?: number
	
	status?: MessageStatusType
}

export type IChatgptMessage = {
	conversation_id: ID
	content: string
	
	type: MessageType
	platform_type: PlatformType.chatGPT
	platform_params: IMessageParams<PlatformType.chatGPT>
	
	sender: ID // todo: 未来做群聊需要这个
	time: Date
	
	status?: MessageStatusType
}

export const createSkeletonMessage = <T extends PlatformType>(sender: ID, conversation_id: ID, message_type: MessageType, platform_type: T, platform_params: IMessageParams<T>): IMessage<T> => ({
	conversation_id,
	content: '',
	
	type: message_type,
	platform_type,
	platform_params,
	
	sender, // todo: 未来做群聊需要这个
	time: Date.now(),
	
	status: 'OK',
})
