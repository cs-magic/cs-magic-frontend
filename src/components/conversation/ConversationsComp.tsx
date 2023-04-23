import { Button } from '@/components/ui/button'
import { IconMessageCircle, IconPencil, IconPlus, IconSquareRoundedX } from '@tabler/icons-react'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import { ID } from '@/ds/general'
import { skipToken } from '@reduxjs/toolkit/query'
import { useUserId } from '@/hooks/use-user'
import { CentralLoadingComp } from '@/components/general/CentralLoadingComp'
import { getChatUrl } from '@/lib/utils'
import { PlatformType } from '@/ds/openai/general'
import { IConversation } from '@/ds/openai/conversation'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { injectOpenAIConversation } from '@/api/conversationApi'
import { useToast } from '@/hooks/use-toast'

export const ConversationsComp = <T extends PlatformType>(
	{
		cid,
		platform_type,
	}: {
		cid: ID | null
		platform_type: T
	}) => {
	
	const user_id = useUserId()
	const router = useRouter()
	
	const {
		useListConversationsQuery,
		useUpdateConversationMutation,
		useDeleteConversationMutation,
	} = injectOpenAIConversation<T>()
	
	const { data: conversations = [], isLoading: isLoadingConversations } =
		useListConversationsQuery(user_id ? { user_id, platform_type } : skipToken)
	
	const ConversationLineComp: FC<{
		conversation: IConversation<T>
		isHighlight?: boolean
	}> = ({ conversation, isHighlight }) => {
		const router = useRouter()
		
		const [isEditing, setEditing] = useState(false)
		const refInput = useRef<HTMLInputElement>(null)
		
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
	
	
	return (
		<div className={'w-full h-full flex flex-col border-r border-base-300'}>
			
			{
				isLoadingConversations ? <CentralLoadingComp/> : (
					<>
						<Link href={getChatUrl({ platform_type: platform_type })}>
							<button className={'btn btn-ghost btn-active btn-sm w-full rounded-none'}>
								<IconPlus size={16}/>
								<p>New Chat</p>
							</button>
						</Link>
						
						<div className={clsx(
							'w-full flex-1 overflow-y-auto',
							'flex justify-end flex-col-reverse', // 倒序展示
						)}>
							{
								conversations.map((conversation: IConversation<T>) =>
									<ConversationLineComp
										key={conversation.id}
										conversation={conversation}
										isHighlight={cid === conversation.id}
									/>)
							}
						</div>
					</>
				)
			}
		
		</div>
	)
}
