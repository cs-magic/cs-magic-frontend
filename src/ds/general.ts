export type ID = string
export type TaskStatus = 'finished' | 'todo' | 'cancelled'

export interface IFeature {
	name: string
	status: TaskStatus
}

export type LangType = 'zh' | 'en' | 'jp'
export const langs = ['zh', 'en', 'jp'] as LangType[]
