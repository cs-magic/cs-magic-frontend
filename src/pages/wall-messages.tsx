import { NextPage } from 'next'
import { RootLayout } from '@/layouts/RootLayout'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FC, useEffect, useRef } from 'react'
import { AvatarView } from '@/components/views/AvatarView'
import { IconDotsVertical, IconThumbDown, IconThumbUp } from '@tabler/icons-react'
import { IWallMessage } from '@/ds/wall-messages'
import { useCreateWallMessageMutation, useListWallMessagesQuery, useVoteWallMessageMutation } from '@/states/apis/wallMessagesApi'
import { useAppSelector } from '@/states/hooks'
import { selectUserId } from '@/states/features/userSlice'
import { clsx } from 'clsx'
import { toast, useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { u } from '@/config'


export const WallMessageComp: FC<IWallMessage> = (props) => {
	
	const [voteWallMessage, result] = useVoteWallMessageMutation()
	const user_id = useAppSelector(selectUserId)
	
	const { toast } = useToast()
	
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
				<AvatarView user={props.poster}/>
				<div className={'grow'}>
					<p>{props.poster.name}</p>
					<p className={'text-gray-500 text-sm'}>{new Date(props.time / 1000000).toLocaleString()}</p>
				</div>
				
				<Button
					className={'inline-flex items-center gap-2'}
					variant={'ghost'}
					size={'sm'}
					disabled={result.isLoading || props.voters_up.includes(user_id)}
					onClick={() => {
						voteWallMessage({ user_id, id: props.id, value: 1 })
					}}>
					<IconThumbUp
						className={'text-green-500'}
					/>
					<span>{props.voters_up.length}</span>
				</Button>
				
				<Button
					className={'inline-flex items-center gap-2'}
					variant={'ghost'}
					size={'sm'}
					disabled={result.isLoading || props.voters_down.includes(user_id)}
					onClick={() => {
						voteWallMessage({ user_id, id: props.id, value: -1 })
					}}>
					<IconThumbDown className={'text-gray-500'}/>
					<span>{props.voters_down.length}</span>
				</Button>
				
				<IconDotsVertical className={clsx(
					'shrink-0',
					'hidden', // todo
				)}/>
			</div>
			
			<article className={'prose dark:prose-invert w-full max-h-[120px] overflow-auto'}>
				<h3>{props.title}</h3>
				{props.content?.split('\n').map((p, index) => (
					<p key={index}>{p}</p>
				))}
			</article>
		
		</div>
	)
}

export const WallMessagesPage: NextPage = () => {
	
	const { data: wallMessages } = useListWallMessagesQuery()
	const [createWallMessage, { isLoading, isError, isSuccess }] = useCreateWallMessageMutation()
	const poster_id = useAppSelector(selectUserId)
	const refTitleInput = useRef<HTMLInputElement>(null)
	const refContentInput = useRef<HTMLTextAreaElement>(null)
	
	console.log({ wallMessages })
	
	useEffect(() => {
		if (isSuccess) {
			refTitleInput.current!.value = ''
			refContentInput.current!.value = ''
		}
	}, [isError, isLoading, isSuccess])
	
	return (
		<RootLayout title={u.routes.user.wall}>
			<div className={'flex flex-col gap-2 max-w-[720px] mx-auto mt-8'}>
				<form
					className={'flex flex-col gap-4'}
					onSubmit={(event) => {
						event.preventDefault()
						console.log({ event })
						const title = event.currentTarget.wmTitle?.value
						const content = event.currentTarget.wmContent?.value
						if (!title) return toast({ title: '标题不能为空', variant: 'destructive' })
						if (!content) return toast({ title: '内容不能为空', variant: 'destructive' })
						createWallMessage({ poster_id, title, content })
					}}>
					<div className={'flex items-center'}>
						<Label className={'w-24'} htmlFor={'wmTitle'}>Title</Label>
						<Input name={'wmTitle'} id={'wmTitle'} ref={refTitleInput}/>
					</div>
					
					<div className={'flex items-center'}>
						<Label className={'w-24'} htmlFor={'wmContent'}>Content</Label>
						<Textarea name={'wmContent'} id={'wmContent'} ref={refContentInput}/>
					</div>
					
					<Button type={'submit'} className={'ml-auto'} disabled={isLoading}>Submit</Button>
				</form>
				
				<h2>留言列表</h2>
				
				<div className={'w-full flex flex-wrap gap-2'}>
					{
						(wallMessages ?? []).map((wallMessage) => (
							<WallMessageComp {...wallMessage} key={wallMessage.id}/>
						))
					}
				</div>
			</div>
		</RootLayout>
	)
}

export default WallMessagesPage
