import { ID } from '@/ds/general'
import { IUserBasic } from '@/ds/user'

export interface IWallMessageCreate {
	poster_id: ID
	title: string
	content?: string
}

export interface IWallMessageVote {
	id: ID
	user_id: ID
	value: 1 | -1
}

export interface IWallMessage extends Omit<IWallMessageCreate, 'poster_id'> {
	id: ID
	poster: IUserBasic
	time: number
	voters_up: ID[]
	voters_down: ID[]
}
