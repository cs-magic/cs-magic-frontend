import { ID } from '@/ds/general'

export interface IUser {
	id: ID
	name: string
	avatar: string | null
}

export enum RichContentType {
	text = 'text',
	image = 'image',
	audio = 'audio',
	video = 'video',
	map = 'map',
}

export interface IRichContent {
	content: string
	type: RichContentType
}

export enum ContentStatus {
	delivering = 'delivering',
	delivered = 'delivered',
	read = 'read',
}

export type ChatMessageSide = 'left' | 'right'

export interface IChatMessageBase {
	side: ChatMessageSide
	user: IUser
	richContent: IRichContent
	status: ContentStatus
	time: number
}

export interface IChatMessage extends Omit<IChatMessageBase, 'user'> {
	userId: ID
}
