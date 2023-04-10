import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { selectUserBasic, selectUserId, setUserBasic } from '@/states/features/userSlice'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { UserPlanningComp } from '@/components/shared/UserPlanningComp'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import _ from 'lodash'
import { updateUserAvatar, updateUserName } from '@/api/user'
import { uploadFile } from '@/api/general'
import { AvatarView } from '@/components/views/AvatarView'
import { LabelLineView } from '@/components/views/LabelLineView'
import { Label } from '@/components/ui/label'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export const NavbarAvatarComp = () => {
	const dispatch = useAppDispatch()
	const userId = useAppSelector(selectUserId)!
	const userBasic = useAppSelector(selectUserBasic)
	const { data: session } = useSession()
	const { toast } = useToast()
	
	const avatarView = <AvatarView user={userBasic} className={'w-8 h-8'}/>
	
	return (
		userId ? (
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
							session ? (
								<Button variant={'outline'} size={'sm'} onClick={(event) => {
									event.preventDefault()
									signOut()
								}}>Sign Out</Button>
							) : (
								<Button variant={'destructive'} size={'sm'} onClick={(event) => {
									// add the following one, o.w. catch errors on Firefox, Safari, ref: https://stackoverflow.com/a/74221510/9422455
									event.preventDefault()
									signIn()
								}}>Sign In</Button>
							)
						}
					/>
					
					<LabelLineView
						label={'name'}
						content={<Input name={'userName'} placeholder={'Unknown'} defaultValue={userBasic.name}/>}
						extra={<Button variant={'outline'} size={'sm'} type={'submit'}>Rename</Button>}
						onSubmit={async (event) => {
							event.preventDefault()
							const name = event.currentTarget.userName.value
							await updateUserName(userId!, name)
							dispatch(setUserBasic({ ...userBasic, name }))
							toast({ title: 'updated' })
						}}
					/>
					
					<LabelLineView
						label={'avatar'}
						content={
							<Label className={'inline-flex items-center gap-2 cursor-pointer'}>
								<AvatarView user={userBasic}/>
								<p className={'text-gray-500 text-sm'}> (Click to Replace)</p>
								{/* todo: tab to access hidden input under label */}
								<input hidden type={'file'} accept={'image/*'} onChange={async (event) => {
									const files = event.currentTarget.files
									if (files?.length === 1) {
										const file = files[0]
										const avatar = await uploadFile(file)
										await updateUserAvatar(userId, avatar)
										dispatch(setUserBasic({ ...userBasic, avatar }))
										toast({ title: 'updated' })
									}
								}}/>
							</Label>
						}
					/>
					
					<LabelLineView
						label={'planning'}
						content={
							<p id={'planning'}>{_.upperCase(userBasic.planning)}</p>}
						extra={<UserPlanningComp/>
						}/>
				
				</DialogContent>
			</Dialog>
		) : (
			<Link href={'/api/auth/signin'}>
				{avatarView}
			</Link>
		)
	)
}
