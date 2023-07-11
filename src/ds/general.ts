import { WechatyInterface } from 'wechaty/src/wechaty/wechaty-impl'

export type ID = string
export type TaskStatus = 'finished' | 'todo' | 'cancelled'

export interface IFeature {
	name: string
	status: TaskStatus
}


export type IBridge = { success: boolean, content: string, bot?: WechatyInterface | undefined }
export type MessageStatusType = 'OK' | 'ERROR' | 'ERROR_TOKEN_DRAIN'


export const TAG_USER = 'user' as const
export const TAG_ALL = '*' as const

export enum MessageType {
	text = 'text',
	image_url = 'image_url',
}
