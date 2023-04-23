import { useEffect, useRef, useState } from 'react'
import { IConversation } from '@/ds/openai/conversation'
import { useRouter } from 'next/router'
import { useToast } from '@/hooks/use-toast'
import { clsx } from 'clsx'
import { IconMessageCircle, IconPencil, IconSquareRoundedX } from '@tabler/icons-react'
import { Input } from '@/components/ui/input'
import { getChatUrl } from '@/lib/utils'
import Link from 'next/link'
import { PlatformType } from '@/ds/openai/general'
import { injectOpenAIConversation } from '@/api/conversationApi'

export const ConversationLineComp = <T extends PlatformType>({ conversation, isHighlight }: {
	conversation: IConversation<T>
	isHighlight?: boolean
}) => {
	const router = useRouter()
	
	const [isEditing, setEditing] = useState(false)
	const refInput = useRef<HTMLInputElement>(null)
	
	const {
		useUpdateConversationMutation,
		useDeleteConversationMutation,
	} = injectOpenAIConversation<T>()
	
	const [updateConversation] = useUpdateConversationMutation()
	const [deleteConversation] = useDeleteConversationMutation()
	
	const { toast } = useToast()
	
	// auto focus
	useEffect(() => {if (isEditing) refInput.current!.select()}, [isEditing])
	
	const { id, name, platform_type } = conversation
	
	const view = (
		<div
			className={clsx(
				'group w-full p-3 flex items-center gap-2 cursor-pointer rounded-none border-b border-base-300',
				'hover:bg-bg-base text-base-content',
				isHighlight && 'bg-bg-border-strong',
			)}
		>
			<IconMessageCircle size={16} className={'shrink-0'}/>
			{
				!isEditing ? <p className={'w-full truncate text-left text-base-content'}>{name || id}</p> : (
					<Input
						ref={refInput}
						defaultValue={name || id}
						onKeyDown={async (event) => {
							if (event.key === 'Enter') {
								setEditing(false)
								await updateConversation({ id, name: event.currentTarget.value, platform_type })
								toast({ title: '已重命名会话' })
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
							onClick={async (e) => {
								e.preventDefault()
								await deleteConversation({ id, platform_type })
								toast({ title: '已删除一个会话' })
								// 当且仅当被删除conversation是当前conversation的时候才需要重定向
								if (isHighlight)
									router.push(getChatUrl({ platform_type }))
							}}/>
					</div>
				)
			}
		
		</div>
	)
	
	return isEditing ? view : (
		<Link href={getChatUrl({ id, platform_type })}>{view}</Link>
	)
}
