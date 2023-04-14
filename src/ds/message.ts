import { ID } from './general'
import { RoleType } from '@/ds/chatgpt'

export enum ContentType {
	text = 'text',
	image_url = 'image_url',
	
}


export enum ModelPlatformType {
	chatgpt = 'chatGPT',
	dalle = 'dalle',
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
