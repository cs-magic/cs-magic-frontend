import { NextPage } from 'next'
import { RootLayout } from '@/components/layouts/RootLayout'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'
import { useCreateWallMessageMutation, useListWallMessagesQuery } from '@/api/wallMessageApi'
import { toast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUserId } from '@/hooks/use-user'
import { WallMessageComp } from '@/components/wallMessages/WallMessageComp'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'


export const WallMessagesPage: NextPage = () => {
	
	const { data: wallMessages } = useListWallMessagesQuery()
	console.log('wallMessages', wallMessages)
	const [createWallMessage, { isLoading, isError, isSuccess }] = useCreateWallMessageMutation()
	const poster_id = useUserId()
	const refTitleInput = useRef<HTMLInputElement>(null)
	const refContentInput = useRef<HTMLTextAreaElement>(null)
	const u = useAppSelector(selectU)
	
	
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
						if (!poster_id) return toast({ title: '登录后才可以提交', variant: 'destructive' })
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
