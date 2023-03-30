import { ID } from '@/ds/general'
import { IUser } from '@/ds/user'

export interface IMessage {
	id: ID
	sender: IUser
	time: number
	content: string
}


export interface IConversation {
	id: ID
	title?: string
}
