import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import _ from 'lodash'
import { AvatarView } from '@/components/views/AvatarView'
import { LabelLineView } from '@/components/views/LabelLineView'
import { Label } from '@/components/ui/label'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useUser, useUserId } from '@/hooks/use-user'
import { useUpdateBasicUserMutation } from '@/api/userApi'
import { useEffect } from 'react'
import { useUploadFileMutation } from '@/api/baseApi'

export const NavbarAvatarComp = () => {
	const user = useUser()
	const userId = useUserId()
	console.log({user, userId})
	
	const { toast } = useToast()
	const [updateUserBasic, { isSuccess }] = useUpdateBasicUserMutation()
	const [uploadFile] = useUploadFileMutation()
	
	const avatarView = <AvatarView user={user} className={'w-8 h-8'}/>
	
	useEffect(() => {
		if (isSuccess) {
			toast({ title: 'updated' })
		}
	}, [isSuccess])
	
	if (!userId) return (
		<Link href={'/api/auth/signin'}>
			{avatarView}
		</Link>
	)
	
	if (!user) return <>{'You Shouldn\'t See This Message Since You Are Not Logged in!'}</>
	
	return (
		<Dialog>
			<DialogTrigger>
				{avatarView}
			</DialogTrigger>
			
			<DialogContent>
				
				<DialogHeader>
					<DialogTitle>Your Profile</DialogTitle>
				</DialogHeader>
				
				<LabelLineView
					label={'id'}
					content={
						// assign tabIndex to this p, is to avoid highlighting the sign-out button
						<p tabIndex={0} className={'text-blue-500 cursor-pointer'} onClick={() => {
							navigator.clipboard.writeText(userId)
							toast({ title: 'copied your user_id' })
						}}>
							{userId}
						</p>
					}
					extra={
						<Button variant={'outline'} size={'sm'} onClick={(event) => {
							event.preventDefault()
							signOut()
						}}>
							Sign Out
						</Button>
					}
				/>
				
				<LabelLineView
					label={'name'}
					content={<Input name={'userName'} placeholder={'Unknown'} defaultValue={user.basic.name}/>}
					extra={<Button variant={'outline'} size={'sm'} type={'submit'}>Rename</Button>}
					onSubmit={async (event) => {
						event.preventDefault()
						updateUserBasic({ id: userId, name: event.currentTarget.userName.value })
					}}
				/>
				
				<LabelLineView
					label={'avatar'}
					content={
						<Label className={'inline-flex items-center gap-2 cursor-pointer'}>
							<AvatarView user={user}/>
							<span className={'text-gray-500 text-sm'}> (Click to Replace)</span>
							<input hidden type={'file'} accept={'image/*'} onChange={async (event) => {
								event.preventDefault()
								const files = event.currentTarget.files
								if (files?.length !== 1) return toast({ title: '一次只能上传一个文件', variant: 'destructive' })
								const avatar = await uploadFile(files[0]).unwrap()
								updateUserBasic({ id: userId, avatar })
							}}/>
						</Label>
					}
				/>
				
				<LabelLineView
					label={'planning'}
					content={
						<p id={'planning'}>{_.upperCase(user.basic.planning)}</p>}
					extra={<Link href={'/userPlanning'}>
						<Button variant={'destructive'} size={null} className={'px-2 py-1'}>User Planning</Button>
					</Link>}/>
			
			</DialogContent>
		</Dialog>
	)
}
