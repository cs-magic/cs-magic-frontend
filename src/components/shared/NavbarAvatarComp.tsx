import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { selectUserBasic, selectUserId, setUserBasic } from '@/states/features/userSlice'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { UserPlanningComp } from '@/components/shared/UserPlanningComp'
import { UserRegisterComp } from '@/components/shared/UserRegisterComp'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import _ from 'lodash'
import { updateUserAvatar, updateUserName } from '@/api/user'
import { uploadFile } from '@/api/general'
import { AvatarView } from '@/components/views/AvatarView'
import { LabelLineView } from '@/components/views/LabelLineView'

export const NavbarAvatarComp = () => {
	const dispatch = useAppDispatch()
	const userId = useAppSelector(selectUserId)!
	const userBasic = useAppSelector(selectUserBasic)
	const { toast } = useToast()
	
	return (
		<Dialog>
			<DialogTrigger>
				<AvatarView user={userBasic}/>
			</DialogTrigger>
			
			<DialogContent>
				
				<DialogHeader>
					<DialogTitle>Your Profile</DialogTitle>
				</DialogHeader>
				
				<LabelLineView
					label={'id'}
					content={
						<p id={'id'} className={'text-blue-500 cursor-pointer'} onClick={() => {
							navigator.clipboard.writeText(userId)
							toast({ title: 'copied your user_id' })
						}}>
							{userId}
						</p>
					}
					extra={<UserRegisterComp/>}
				/>
				
				<LabelLineView
					label={'name'}
					content={<Input name={'userName'} placeholder={'Unknown'} defaultValue={userBasic.name}/>}
					extra={<Button variant={'default'} size={'sm'} type={'submit'}>Rename</Button>}
					onSubmit={async (event) => {
						event.preventDefault()
						const name = event.currentTarget.userName.value
						await updateUserName(userId!, name)
						dispatch(setUserBasic({ ...userBasic, name }))
					}}
				/>
				
				<LabelLineView
					label={'avatar'}
					content={
					<label className={'inline-flex items-center gap-2 cursor-pointer'}>
						<AvatarView user={userBasic}/>
						<p className={'text-gray-500 text-sm'}> (Click to Replace)</p>
						<input hidden type={'file'} accept={'image/*'} onChange={async (event) => {
							const files = event.currentTarget.files
							if (files?.length === 1) {
								const file = files[0]
								const avatar = await uploadFile(file)
								await updateUserAvatar(userId, avatar)
								dispatch(setUserBasic({ ...userBasic, avatar }))
							}
						}}/>
					</label>
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
	)
}
