import { IChatgptMessageParams } from '@/ds/openai/chatgpt'

export interface IDalleConversationParams {
}

export enum DalleDimensionType {
	sm = '256x256',
	md = '512x512',
	lg = '1024x1024'
}

/**
 * todo: 目前Dalle的消息可以复用ChatGPT的数据结构（role）
 */
export interface IDalleMessageParams extends IChatgptMessageParams {
	dimension: DalleDimensionType
}
