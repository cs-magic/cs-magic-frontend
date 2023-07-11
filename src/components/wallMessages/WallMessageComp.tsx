import { FC, useEffect } from 'react'
import { IWallMessage } from '@/ds/wall-messages'
import { useVoteWallMessageMutation } from '@/states/api/wallMessageApi'
import { useToast } from '@/hooks/use-toast'
import { useUserId } from '@/hooks/use-user'
import { BasicUserAvatar } from '@/components/user/UserAvatar'
import { Button } from '@/components/ui/button'
import { IconDotsVertical, IconThumbDown, IconThumbUp } from '@tabler/icons-react'
import { clsx } from 'clsx'

export const WallMessageComp: FC<IWallMessage> = ({ poster_id, poster, time, voters_up, voters_down, id, title, content }) => {
	
	const [voteWallMessage, result] = useVoteWallMessageMutation()
	
	const { toast } = useToast()
	
	const user_id = useUserId()
	
	useEffect(() => {
		console.log('voted result:', result)
		if (result.isError) {
			// @ts-ignore
			toast({ title: result.error.data.detail, variant: 'destructive' })
		} else if (result.isSuccess) {
			toast({ title: '已投票' })
		}
	}, [result.isError, result.isSuccess])
	
	return (
		<div className={'p-4 rounded-md shadow-xl border border-gray-500 w-full flex flex-col gap-2'}>
			
			<div className={'wm-user flex items-center gap-4'}>
				<BasicUserAvatar user={poster} id={poster_id}/>
				<div className={'grow'}>
					<p>{poster.name}</p>
					<p className={'text-gray-500 text-sm'}>{new Date(time / 1000000).toLocaleString()}</p>
				</div>
				
				<Button
					className={'inline-flex items-center gap-2'}
					variant={'ghost'}
					size={'sm'}
					disabled={result.isLoading || (user_id ? voters_up.includes(user_id) : false)}
					onClick={() => {
						if (!user_id) return toast({ title: '登录后才可以投票', variant: 'destructive' })
						voteWallMessage({ user_id, id, value: 1 })
					}}>
					<IconThumbUp
						className={'text-green-500'}
					/>
					<span>{voters_up.length}</span>
				</Button>
				
				<Button
					className={'inline-flex items-center gap-2'}
					variant={'ghost'}
					size={'sm'}
					disabled={result.isLoading || (user_id ? voters_down.includes(user_id) : false)}
					onClick={() => {
						if (!user_id) return toast({ title: '登录后才可以投票', variant: 'destructive' })
						voteWallMessage({ user_id, id, value: -1 })
					}}>
					<IconThumbDown className={'text-gray-500'}/>
					<span>{voters_down.length}</span>
				</Button>
				
				<IconDotsVertical className={clsx(
					'shrink-0',
					'hidden', // todo
				)}/>
			</div>
			
			<article className={'prose dark:prose-invert w-full max-h-[120px] overflow-auto'}>
				<h3>{title}</h3>
				{content?.split('\n').map((p, index) => (
					<p key={index}>{p}</p>
				))}
			</article>
		
		</div>
	)
}
