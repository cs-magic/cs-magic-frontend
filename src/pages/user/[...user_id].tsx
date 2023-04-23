import { useRouter } from 'next/router'
import { useGetUserQuery, useUpdateBasicUserMutation } from '@/api/userApi'
import { CentralLayout } from '@/components/layouts/CentralLayout'
import { useToast } from '@/hooks/use-toast'
import { UserAvatarView } from '@/components/general/UserAvatarView'
import { useUploadFileMutation } from '@/api/fileApi'
import _ from 'lodash'
import { useUser } from '@/hooks/use-user'
import { RootLayout } from '@/components/layouts/RootLayout'
import { ReactNode, useRef } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserPlanningType } from '@/ds/user'
import { signOut } from 'next-auth/react'
import { routers } from '@/config/routers'


const InputGroup = ({ label, children, extra }: {
	label: string
	children: ReactNode
	extra?: ReactNode
}) => {
	return (
		<div className={'w-full inline-flex items-center'}>
			<Label className={'w-24'}>{label}</Label>
			<div className={'grow inline-flex items-center gap-2'}>
				{children}
			</div>
			{extra}
		</div>
	)
}

export const UserPage = () => {
	const router = useRouter()
	
	const user_id = router.query.user_id as string
	
	const curUser = useUser()
	const { data: targetUser } = useGetUserQuery(user_id)
	const { toast } = useToast()
	
	const [updateBasicUser] = useUpdateBasicUserMutation()
	const [uploadFile] = useUploadFileMutation()
	
	const refName = useRef<HTMLInputElement>(null)
	
	const self = curUser?.id === targetUser?.id
	
	if (!targetUser) return <CentralLayout>User Not Existed!</CentralLayout>
	
	return (
		<RootLayout>
			<div className={'m-auto w-full md:w-[480px] flex flex-col gap-4'}>
				
				<div className={'w-full inline-flex items-center gap-4'}>
					<UserAvatarView user={targetUser} className={'w-20 h-20 '}/>
					{/* todo: admin privilege */}
					<Label htmlFor={'upload-avatar'} className={'text-gray-500 bg-transparent text-sm cursor-pointer'}> (Click to Replace)</Label>
					<input id={'upload-avatar'} hidden type={'file'} accept={'image/*'} onChange={async (event) => {
						event.preventDefault()
						const files = event.currentTarget.files
						if (files?.length !== 1) return toast({ title: '一次只能上传一个文件', variant: 'destructive' })
						const avatar = await uploadFile(files[0]).unwrap()
						updateBasicUser({ id: targetUser.id, body: { avatar } })
					}}/>
				</div>
				
				<InputGroup label={'ID'}>
					<span
						className={'grow bg-base-200 text-primary cursor-pointer'}
						onClick={() => {
							navigator.clipboard.writeText(user_id)
							toast({ title: 'copied your user_id' })
						}}>
						{user_id}
					</span>
					<Button
						disabled={!self}
						variant={'secondary'}
						className={'w-24 shrink-0'}
						onClick={() => signOut()}>
						Log Out
					</Button>
				</InputGroup>
				
				
				<InputGroup label={'Name'}>
					<Input className={'grow'} placeholder={'你怎么连个名字都没有！'} defaultValue={targetUser.basic.name || undefined} ref={refName}/>
					<Button className={'w-24 shrink-0'} onClick={() => updateBasicUser({ id: targetUser.id, body: { name: refName.current!.value } })}>
						Rename
					</Button>
				</InputGroup>
				
				<InputGroup label={'Planning'}>
					<span id={'planning'} className={'grow text-lg font-semibold'}>{_.upperCase(targetUser.basic.membership.planning)}</span>
					
					<Button disabled={!self || targetUser.basic.membership.planning === UserPlanningType.blackVip}
					        className={'w-24 shrink-0'}
					        onClick={() => router.push(routers.user.planning)}>
						Upgrade
					</Button>
				</InputGroup>
			
			
			</div>
		
		</RootLayout>
	)
}

export default UserPage
