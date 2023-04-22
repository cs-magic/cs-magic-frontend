import { useRouter } from 'next/router'
import { useGetUserQuery, useUpdateBasicUserMutation } from '@/api/userApi'
import { CentralLayout } from '@/components/layouts/CentralLayout'
import { useToast } from '@/hooks/use-toast'
import { signOut } from 'next-auth/react'
import { UserAvatarView } from '@/components/UserAvatarView'
import { useUploadFileMutation } from '@/api/fileApi'
import { routers } from '@/config/general'
import _ from 'lodash'
import { useUser } from '@/hooks/use-user'
import { RootLayout } from '@/components/layouts/RootLayout'
import { useRef } from 'react'

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
				
				
				<div className={'form-control w-full'}>
					<label className={'input-group w-ful'}>
						<span className={'w-24'}>ID</span>
						<span className={'grow bg-base-200 text-primary cursor-pointer'} onClick={() => {
							navigator.clipboard.writeText(user_id)
							toast({ title: 'copied your user_id' })
						}}>
						{user_id}
					</span>
						
						<button disabled={!self} className={'w-24 btn btn-sm'} onClick={(event) => {
							event.preventDefault()
							signOut()
						}}>Sign Out
						</button>
					</label>
				</div>
				
				<div className={'form-control w-full'}>
					<label className={'input-group w-full'}>
						<span className={'w-24'}>Name</span>
						<input className={'grow'} placeholder={'你怎么连个名字都没有！'} defaultValue={targetUser.basic.name || undefined} ref={refName}/>
						<button className={'w-24 btn btn-sm'}
						        type={'button'}
						        onClick={() => updateBasicUser({ id: targetUser.id, body: { name: refName.current!.value } })}>Rename
						</button>
					</label>
				</div>
				
				
				<div className={'form-control w-full'}>
					<label className={'input-group w-full'}>
						<span className={'w-24'}>Avatar</span>
						{/* todo: grow not work here */}
						<UserAvatarView user={targetUser} className={'grow'}/>
						<span className={'text-gray-500 bg-transparent text-sm'}> (Click to Replace)</span>
						<input hidden type={'file'} accept={'image/*'} onChange={async (event) => {
							event.preventDefault()
							const files = event.currentTarget.files
							if (files?.length !== 1) return toast({ title: '一次只能上传一个文件', variant: 'destructive' })
							const avatar = await uploadFile(files[0]).unwrap()
							updateBasicUser({ id: targetUser.id, body: { avatar } })
						}}/>
					</label>
				</div>
				
				
				<div className={'form-control w-full'}>
					<label className={'input-group w-full'}>
						<span className={'w-24'}>Planning</span>
						<span id={'planning'} className={'grow bg-base-200'}>{_.upperCase(targetUser.basic.membership.planning)}</span>
						
						<button disabled={!self} className={'w-24 btn btn-sm'} onClick={() => router.push(routers.userPlanning.href)}>
							Upgrade
						</button>
					</label>
				</div>
			
			
			</div>
		
		</RootLayout>
	)
}

export default UserPage
