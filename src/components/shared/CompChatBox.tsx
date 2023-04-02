import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/states/hooks'
import { useRef } from 'react'
import { IMessage, RoleType } from '@/ds/conversation'
import { v4 } from 'uuid'
import { addMessage } from '@/states/features/messages'
import api from '@/lib/api'

export const CompChatBox = ({ conversation_id }: {
	conversation_id: string
}) => {
	
	const dispatch = useAppDispatch()
	
	const refMessage = useRef<HTMLTextAreaElement | null>(null)
	
	const onSubmit = async () => {
		const sendingMessage = refMessage.current!.value
		refMessage.current!.value = ''
		console.log('sending message:', sendingMessage)
		
		const genMessage = (content: string, role: RoleType): IMessage => ({
			id: v4(),
			conversation_id,
			time: Date.now(),
			role,
			content,
		})
		
		dispatch(addMessage(genMessage(sendingMessage, RoleType.user)))
		
		const res = await api.post('/openai/chatgpt/reverse/chat', {
			client_id: 'test001',
			conversation_id,
			message: sendingMessage,
		})
		const receivedMessage = res.data
		console.log('received response: ', receivedMessage)
		dispatch(addMessage(genMessage(receivedMessage, RoleType.assistant)))
	}
	
	return (
		<div className="grid w-full gap-2">
			<Textarea ref={refMessage} placeholder="Type your message here."/>
			<Button type={'button'} onClick={onSubmit}>Send</Button>
		</div>
	)
}
