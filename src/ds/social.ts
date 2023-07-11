import { ID } from '@/ds/general'

export interface IComment {
	id: ID
	user_id: ID
	comment: string
	time: Date
	
	deleted: boolean
	quote: ID
}

export interface ISocial {
	stars: number
	forks: number
	comments: IComment[]
}
