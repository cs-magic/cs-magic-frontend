import { ID } from '@/ds/general'
import { AVATAR_SAMPLE_URI } from '@/settings'
import { clsx } from 'clsx'
import { useGetUserQuery } from '@/states/api/userApi'
import { skipToken } from '@reduxjs/toolkit/query'
import { Skeleton } from '../ui/skeleton'

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
	time: Date
}

export interface IChatMessage extends Omit<IChatMessageBase, 'user'> {
	userId: ID
}

export const ChatMessageBase = (props: IChatMessageBase) => {
	return (
		<div className={clsx('chat', props.side === 'left' ? 'chat-start' : 'chat-end')}>
			<div className="chat-image avatar">
				{
					props.user.avatar
						? (
							<div className="w-10 rounded-full">
								<img src={AVATAR_SAMPLE_URI} alt={'avatar'}/>
							</div>
						)
						: (
							<Skeleton className="w-10 h-10 rounded-full"/>
						)
				}
			</div>
			<div className="chat-header">
				{props.user.name}
				<time className="text-xs opacity-50">12:45</time>
			</div>
			
			{props.richContent.type === RichContentType.text && (
				<div className="chat-bubble">{props.richContent.content}</div>
			)}
			{/*todo: other types*/}
			
			{/* note: footer */}
			{/*<div className="chat-footer opacity-50">*/}
			{/*	Delivered*/}
			{/*</div>*/}
		
		</div>
	)
}

export const ChatMessage = ({ userId, ...props }: IChatMessage) => {
	const { data } = useGetUserQuery(userId ?? skipToken)
	const user: IUser = {
		id: userId,
		name: data?.basic.name ?? userId,
		avatar: data?.basic.avatar ?? null,
	}
	return <ChatMessageBase {...props} user={user}/>
}
