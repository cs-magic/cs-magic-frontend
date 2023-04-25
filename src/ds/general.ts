import { WechatyInterface } from 'wechaty/src/wechaty/wechaty-impl'

export type ID = string
export type TaskStatus = 'finished' | 'todo' | 'cancelled'

export interface IFeature {
	name: string
	status: TaskStatus
}

export type LangType = 'zh' | 'en' | 'jp'
export const langs = ['zh', 'en', 'jp'] as LangType[]
export type IBridge = { success: boolean, content: string, bot?: WechatyInterface | undefined }
export type MessageStatusType = 'OK' | 'ERROR' | 'ERROR_TOKEN_DRAIN'
