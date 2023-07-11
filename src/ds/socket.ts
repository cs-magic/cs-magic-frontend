import { ID } from '@/ds/general'

export enum SocketActionType {
	join_room = 'join_room',
	leave_room = 'leave_room',
	call_chatgpt = 'call_chatgpt',
	call_midjourney = 'call_midjourney',
}

export interface ISocketMessage {
	room_id: ID
	user_id: ID
	action: SocketActionType
	args: object
}
