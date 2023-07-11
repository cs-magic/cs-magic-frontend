import { ID } from '@/ds/general'
import { clsx } from 'clsx'
import { useGetUserQuery } from '@/states/api/userApi'
import { skipToken } from '@reduxjs/toolkit/query'
import { Skeleton } from '../ui/skeleton'
import { USER_OPENAI } from '@/settings'
import { useMoment } from '@/hooks/use-moment'


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
	const m = useMoment()
	
	return (
		<div className={clsx('chat', props.side === 'left' ? 'chat-start' : 'chat-end')}>
			<div className="chat-image avatar">
				{
					props.user.avatar
						? (
							<div className="w-10 rounded-full">
								<img src={props.user.avatar} alt={'avatar'}/>
							</div>
						)
						: (
							<Skeleton className="w-10 h-10 rounded-full"/>
						)
				}
			</div>
			<div className=" chat-header text-xs opacity-50 flex gap-1">
				{props.user.name}
				<time className="">{m(props.time).fromNow()}</time>
			</div>
			
			{props.richContent.type === RichContentType.text && (
				<div className={clsx('chat-bubble', props.side === 'right' ? 'bg-[#29B560] text-black' : 'bg-gray-500 text-white')}>{props.richContent.content}</div>
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
	const { data } = useGetUserQuery(userId && userId !== USER_OPENAI.id ? userId : skipToken)
	const user: IUser = userId === USER_OPENAI.id ? USER_OPENAI : {
		id: userId,
		name: data?.basic.name ?? userId,
		avatar: data?.basic.avatar ?? null,
	}
	return <ChatMessageBase {...props} user={user}/>
}
