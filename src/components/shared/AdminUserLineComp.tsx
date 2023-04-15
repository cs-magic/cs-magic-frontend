import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IUserBasic, UserPlanningType, UserRole, UserState } from '@/ds/user'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { AvatarView } from '@/components/views/AvatarView'
import { useUpdateUserChatGPTMutation } from '@/api/openai/chatgptApi'
import { useUpdateUserBasicMutation } from '@/api/userApi'
import { IUserChatgpt } from '@/ds/openai'
import { toast } from '@/hooks/use-toast'

export const AdminUserLineComp = ({ user, index }: {
	user: UserState
	index: number
}) => {
	const [userBasicData, setUserBasicData] = useState<IUserBasic>(user.basic)
	const [userChatgptData, setUserChatgptData] = useState<IUserChatgpt>(user.chatgpt)
	
	const [updateUserBasic] = useUpdateUserBasicMutation()
	const [updateUserChatGPT] = useUpdateUserChatGPTMutation()
	
	if (!user.id) console.error(user)
	
	return (
		<tr key={index} className={'w-full'}>
			<th>{index + 1}</th>
			<th>{user.id}</th>
			<td>{user.basic.name}</td>
			<td><AvatarView user={user.basic}/></td>
			<td>{user.basic.email}</td>
			
			<td>
				<Select defaultValue={user.basic.role} onValueChange={(role: UserRole) => setUserBasicData({ ...userBasicData, role })}>
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
				<Select defaultValue={user.basic.planning} onValueChange={(planning: UserPlanningType) => setUserBasicData({ ...userBasicData, planning })}>
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
				<input type={'date'} defaultValue={user.basic.expire || new Date().toISOString().split('T')[0]} step={31}
				       onChange={(event) => {setUserBasicData({ ...userBasicData, expire: event.currentTarget.value })}}/>
			</td>
			
			<td>
				<input type={'number'} defaultValue={user.chatgpt.balance}
				       onChange={(event) => {setUserChatgptData({ ...userChatgptData, balance: parseInt(event.currentTarget.value) })}}/>
			</td>
			
			<td>{user.chatgpt.consumption}</td>
			
			<td>{user.chatgpt.cnt}</td>
			
			<td>
				<Input defaultValue={user.basic.note} onChange={(event) => setUserBasicData({ ...userBasicData, note: event.currentTarget.value })}/>
			</td>
			
			<td className={'inline-flex items-center'}>
				<Button size={'sm'} onClick={async () => {
					await updateUserBasic({ ...userBasicData, id: user.id! })
					await updateUserChatGPT({ ...userChatgptData, id: user.id! })
					toast({title: `updated user(id=${user.id})`})
				}}>Confirm</Button>
			</td>
		
		</tr>
	)
}
