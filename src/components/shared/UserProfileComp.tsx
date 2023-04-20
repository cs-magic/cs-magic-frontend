import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import _ from 'lodash'
import { UserAvatarView } from '@/components/views/UserAvatarView'
import { LabelLineView } from '@/components/views/LabelLineView'
import { Label } from '@/components/ui/label'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useUser } from '@/hooks/use-user'
import { useUpdateBasicUserMutation } from '@/api/userApi'
import { useEffect } from 'react'
import { useUploadFileMutation } from '@/api/fileApi'
import { routers } from '@/config'

export const UserProfileComp = () => {
	const user = useUser()
	
	const { toast } = useToast()
	const [updateUserBasic, { isSuccess }] = useUpdateBasicUserMutation()
	const [uploadFile] = useUploadFileMutation()
	
	const avatarView = <UserAvatarView user={user} className={'w-8 h-8'}/>
	
	useEffect(() => {
		if (isSuccess) {
			toast({ title: 'updated' })
		}
	}, [isSuccess])
	
	return <Link href={ user ? `/user/${user.id}` : '/api/auth/signin'}>{avatarView}</Link>
			// <Dialog>
			// 	<DialogTrigger>
			// 		{avatarView}
			// 	</DialogTrigger>
			//
			// 	<DialogContent>
			//
			// 		<DialogHeader>
			// 			<DialogTitle>Your Profile</DialogTitle>
			// 		</DialogHeader>
			//
			// 		<LabelLineView
			// 			label={'id'}
			// 			content={
			// 				// assign tabIndex to this p, is to avoid highlighting the sign-out button
			// 				<p tabIndex={0} className={'text-blue-500 cursor-pointer'} onClick={() => {
			// 					navigator.clipboard.writeText(user.id)
			// 					toast({ title: 'copied your user_id' })
			// 				}}>
			// 					{user.id}
			// 				</p>
			// 			}
			// 			extra={
			// 				<Button variant={'outline'} size={'sm'} onClick={(event) => {
			// 					event.preventDefault()
			// 					signOut()
			// 				}}>
			// 					Sign Out
			// 				</Button>
			// 			}
			// 		/>
			//
			// 		<LabelLineView
			// 			label={'name'}
			// 			content={<Input name={'userName'} placeholder={'你怎么连个名字都没有！'} defaultValue={user.basic.name || undefined}/>}
			// 			extra={<Button variant={'outline'} size={'sm'} type={'submit'}>Rename</Button>}
			// 			onSubmit={async (event) => {
			// 				event.preventDefault()
			// 				updateUserBasic({ id: user.id, body: { name: event.currentTarget.userName.value } })
			// 			}}
			// 		/>
			//
			// 		<LabelLineView
			// 			label={'avatar'}
			// 			content={
			// 				<Label className={'inline-flex items-center gap-2 cursor-pointer'}>
			// 					<UserAvatarView user={user}/>
			// 					<span className={'text-gray-500 text-sm'}> (Click to Replace)</span>
			// 					<input hidden type={'file'} accept={'image/*'} onChange={async (event) => {
			// 						event.preventDefault()
			// 						const files = event.currentTarget.files
			// 						if (files?.length !== 1) return toast({ title: '一次只能上传一个文件', variant: 'destructive' })
			// 						const avatar = await uploadFile(files[0]).unwrap()
			// 						updateUserBasic({ id: user.id, body: { avatar } })
			// 					}}/>
			// 				</Label>
			// 			}
			// 		/>
			//
			// 		<LabelLineView
			// 			label={'planning'}
			// 			content={
			// 				<p id={'planning'}>{_.upperCase(user.basic.membership.planning)}</p>}
			// 			extra={<Link href={routers.userPlanning.href}>
			// 				<Button variant={'destructive'} size={null} className={'px-2 py-1'}>User Planning</Button>
			// 			</Link>}/>
			//*	*/
			//*	</DialogContent>*/
			//*</Dialog>*/
		// )
}
