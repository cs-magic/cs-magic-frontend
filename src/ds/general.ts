export type ID = string
export type TaskStatus = 'finished' | 'todo' | 'cancelled'

export interface IFeature {
	name: string
	status: TaskStatus
}

export const langs = ['zh', 'en', 'jp'] as const
export type LangType = typeof langs[number]
