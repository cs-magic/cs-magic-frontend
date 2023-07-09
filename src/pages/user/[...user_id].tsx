import { useRouter } from 'next/router'
import { useGetUserQuery, useUpdateBasicUserMutation } from '@/states/api/userApi'
import { CentralLayout } from '@/components/layouts/CentralLayout'
import { useToast } from '@/hooks/use-toast'
import { UserAvatarView } from '@/components/general/UserAvatarView'
import { useUploadFileMutation } from '@/states/api/fileApi'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'


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
	
	const isAdmin = curUser?.basic.role === 'admin'
	const isSelf = curUser?.id === targetUser?.id
	
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
				
				<Card>
					<CardHeader>
						<CardTitle>Basic</CardTitle>
					</CardHeader>
					
					<CardContent className={'flex flex-col gap-2'}>
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
								disabled={!isSelf}
								variant={'secondary'}
								className={'w-24 shrink-0'}
								onClick={() => signOut()}>
								Log Out
							</Button>
						</InputGroup>
						
						<InputGroup label={'Name'}>
							<Input className={'grow'} placeholder={'你怎么连个名字都没有！'} defaultValue={targetUser.basic.name || undefined} ref={refName}/>
							<Button variant={'secondary'} className={'w-24 shrink-0'} onClick={async () => {
								await updateBasicUser({ id: targetUser.id, body: { name: refName.current!.value } })
								toast({ title: 'renamed !' })
							}}>
								Rename
							</Button>
						</InputGroup>
						
						<InputGroup label={'Planning'}>
							<span id={'planning'} className={'grow text-lg font-semibold'}>{_.upperCase(targetUser.basic.planning_type)}</span>
							
							<Button variant={'secondary'} disabled={!isSelf || targetUser.basic.planning_type === UserPlanningType.blackVip}
							        className={'w-24 shrink-0'}
							        onClick={() => router.push(routers.user.planning)}>
								Upgrade
							</Button>
						</InputGroup>
					</CardContent>
				</Card>
				
				<Card>
					<CardHeader>
						<CardTitle>Bills</CardTitle>
					</CardHeader>
					
					<CardContent className={'flex flex-col gap-2'}>
						<InputGroup
							label={'balance'}
							extra={(
								<Button
									disabled={!isSelf && !isAdmin}
									variant={'secondary'}
									className={'w-24 shrink-0'}
									onClick={() => toast({ title: 'todo' })}
								
								>
									Charge
								</Button>
							)}
						>
							{curUser?.openai.balance}
						</InputGroup>
						
						<InputGroup
							label={'consumption'}
							extra={(
								<Button
									disabled={!isSelf && !isAdmin}
									variant={'secondary'}
									className={'w-24 shrink-0'}
									onClick={() => toast({ title: 'todo' })}
								
								>
									Detail
								</Button>
							)}
						>
							{curUser?.openai.consumption}
						</InputGroup>
						
						<InputGroup
							label={'conversations count'}
							extra={(
								<Button
									disabled={!isSelf && !isAdmin}
									variant={'secondary'}
									className={'w-24 shrink-0'}
									onClick={() => toast({ title: 'todo' })}
								>
									Detail
								</Button>
							)}
						>
							{curUser?.openai.cnt}
						</InputGroup>
					
					
					</CardContent>
				</Card>
			
			
			</div>
		
		</RootLayout>
	)
}

export default UserPage
