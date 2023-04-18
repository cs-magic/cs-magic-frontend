import { ID } from '@/ds/general'
import { IUser, IUserBasic } from '@/ds/user'

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

export interface IWallMessage extends IWallMessageCreate {
	id: ID
	poster: IUserBasic
	time: number
	voters_up: ID[]
	voters_down: ID[]
}
