import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IUser, IUserBasic, IUserOpenAI, UserPlanningType, UserRole } from '@/ds/user'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { AvatarView } from '@/components/views/AvatarView'
import { useUpdateBasicUserMutation, useUpdateOpenAIUserMutation } from '@/api/userApi'
import { toast } from '@/hooks/use-toast'

export const AdminUserLineComp = ({ user, index }: {
	user: IUser
	index: number
}) => {
	const [userBasicData, setUserBasicData] = useState<IUserBasic>(user.basic!)
	const [userOpenAIData, setUserOpenAIData] = useState<IUserOpenAI>(user.openai!)
	
	const [updateBasicUser] = useUpdateBasicUserMutation()
	const [updateOpenAIUser] = useUpdateOpenAIUserMutation()
	
	if (!user.id) console.error(user)
	
	return (
		<tr key={index} className={'w-full'}>
			<th>{index + 1}</th>
			<th>{user.id}</th>
			<td>{userBasicData.name}</td>
			<td><AvatarView user={user}/></td>
			<td>{userBasicData.email}</td>
			
			<td>
				<Select value={userBasicData.role} onValueChange={(role: UserRole) => setUserBasicData({ ...userBasicData, role })}>
					<SelectTrigger>
						<SelectValue placeholder={'role'}/>
					</SelectTrigger>
					<SelectContent>
						{Object.values(UserRole).map((role) => (
							<SelectItem value={role} key={role}>{role}</SelectItem>
						))}
					</SelectContent>
				</Select>
			
			</td>
			
			<td>
				<Select value={userBasicData.planning} onValueChange={(planning: UserPlanningType) => setUserBasicData({ ...userBasicData, planning })}>
					<SelectTrigger>
						<SelectValue placeholder={'planning'}/>
					</SelectTrigger>
					
					<SelectContent>
						{Object.values(UserPlanningType).map((planning) => (
							<SelectItem value={planning} key={planning}>{planning}</SelectItem>
						))}
					</SelectContent>
				</Select>
			</td>
			
			<td>
				<input type={'date'} value={userBasicData.expire || new Date().toISOString().split('T')[0]} step={31}
				       onChange={(event) => {setUserBasicData({ ...userBasicData, expire: event.currentTarget.value })}}/>
			</td>
			
			<td>
				<input type={'number'} value={userOpenAIData.balance}
				       onChange={(event) => {setUserOpenAIData({ ...userOpenAIData, balance: parseInt(event.currentTarget.value) })}}/>
			</td>
			
			<td>{userOpenAIData.consumption}</td>
			
			<td>{userOpenAIData.cnt}</td>
			
			<td>
				<Input value={userBasicData.note} onChange={(event) => setUserBasicData({ ...userBasicData, note: event.currentTarget.value })}/>
			</td>
			
			<td className={'inline-flex items-center'}>
				<Button size={'sm'} onClick={async () => {
					await updateBasicUser({ body: userBasicData, id: user.id })
					await updateOpenAIUser({ body: userOpenAIData, id: user.id })
					toast({ title: `updated user(id=${user.id})` })
				}}>Confirm</Button>
			</td>
		
		</tr>
	)
}
