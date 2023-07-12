import { ID } from '@/ds/general'
import { IChatgptMessage } from '@/ds/openai/chatgpt'

export enum SocketActionType {
	join_room = 'join_room',
	leave_room = 'leave_room',
	call_chatgpt = 'call_chatgpt',
	call_midjourney = 'call_midjourney',
}

export interface IClientSocketMessage {
	user_id?: ID // 在没有登陆账号时，理应也能看到别人的消息
	
	room_id: ID
	action: SocketActionType
	args: object
}


export interface IServerSocketMessageChatgpt {
	msg: IChatgptMessage
	type: SocketActionType
}
