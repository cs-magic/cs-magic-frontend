import { IChatgptConversation } from '@/ds/chatgpt_v2'
import Link from 'next/link'
import { IconMessageCircle, IconPencil, IconSquareRoundedX } from '@tabler/icons-react'
import { asyncDelConversation } from '@/states/thunks/chatgpt'
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { selectChatgptConversationID, setConversationName } from '@/states/features/conversationSlice'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { updateChatgptConversationName } from '@/api/chatgpt'
import { selectUserId } from '@/states/features/userSlice'

export const ConversationLineComp = ({ conversation }: {
	conversation: IChatgptConversation
}) => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const user_id = useAppSelector(selectUserId)
	const conversation_id = useAppSelector(selectChatgptConversationID)
	
	const [isEditing, setEditing] = useState(false)
	const refInput = useRef<HTMLInputElement>(null)
	
	useEffect(() => {
		if (isEditing) {
			refInput.current!.select()
		}
	}, [isEditing])
	
	return (
		<Button
			variant={'ghost'}
			className={clsx(
				'group w-full p-3 flex items-center gap-2 cursor-pointer rounded-none border-b border-gray-200 dark:border-gray-700',
				conversation_id === conversation.id && 'bg-gray-200 dark:bg-gray-700',
			)}
		>
			<IconMessageCircle size={16} className={'shrink-0'}/>
			{
				!isEditing ? (
					<Link href={`/chat/${conversation.id}`} className={'grow truncate text-left'}>{conversation.name || conversation.id}</Link>
				) : (
					<Input
						ref={refInput}
						defaultValue={conversation.name || conversation.id}
						onKeyDown={async (event) => {
							if (event.key === 'Enter') {
								setEditing(false)
								const name = event.currentTarget.value
								await updateChatgptConversationName({ user_id, conversation_id: conversation.id, model: conversation.model }, name)
								await dispatch(setConversationName({ id: conversation.id, name }))
							}
						}}
						onBlur={() => setEditing(false)}
					/>
				)
			}
			
			{
				!isEditing && (
					<div className={'hidden group-hover:flex shrink-0 items-center gap-2 z-auto'}>
						
						<IconPencil className={'text-green-700'} onClick={(event) => {
							event.preventDefault()
							setEditing(true)
						}
						}/>
						
						<IconSquareRoundedX
							className={'text-red-500'}
							onClick={(e) => {
								e.preventDefault()
								dispatch(asyncDelConversation(conversation.id))
								// 当且仅当被删除conversation是当前conversation的时候才需要重定向
								if (conversation.id === conversation_id)
									router.push('/chat')
							}}/>
					</div>
				)
			}
		
		</Button>
	
	)
}
