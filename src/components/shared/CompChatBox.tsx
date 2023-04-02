import { Textarea } from '@/components/ui/textarea'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { useRef } from 'react'
import { IMessage, RoleType } from '@/ds/conversation'
import { v4 } from 'uuid'
import { addMessage } from '@/states/features/messages'
import api from '@/lib/api'
import { IconBrandTelegram } from '@tabler/icons-react'
import { selectUserID } from '@/states/features/user'
import { ID } from '@/ds/general'
import { sendChat } from '@/states/thunks/chat'


export interface IChatModel {
	user_id: ID
	conversation_id?: ID
	model: string
	content: string
}

export const CompChatBox = ({ conversation_id, model }: {
	conversation_id?: ID
	model: string
}) => {
	
	const dispatch = useAppDispatch()
	
	const user_id = useAppSelector(selectUserID)
	
	const refMessage = useRef<HTMLTextAreaElement | null>(null)
	
	const onSubmit = async () => {
		const sendingMessage = refMessage.current!.value
		refMessage.current!.value = ''
		dispatch(sendChat({
			user_id,
			conversation_id,
			model,
			content: sendingMessage,
		}))
	}
	
	return (
		<div className="w-full p-4 relative">
			<Textarea className={'w-full shadow-xl'} ref={refMessage} placeholder="Type your message here.">
			</Textarea>
			<IconBrandTelegram className={'absolute right-8 bottom-6 cursor-pointer'} onClick={onSubmit}/>
		</div>
	)
}
