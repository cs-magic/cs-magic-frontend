import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateUserPlanning } from '@/api/user'
import { UserPlanningType } from '@/ds/user'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { UserState } from '@/states/features/userSlice'

export const AdminUserLineComp = ({ user, index }: {
	user: UserState
	index: number
}) => {
	const [planning, setPlanning] = useState(user.basic.planning)
	const [expire, setExpire] = useState(user.basic.expire)
	const [tokens, setTokens] = useState(user.chatgpt.balance)
	
	return (
		<tr key={index} className={'overflow-x-auto'}>
			<th>{index + 1}</th>
			<th>{user.basic.id}</th>
			<td>{user.basic.name}</td>
			<td>{user.basic.email}</td>
			<td>
				<Select defaultValue={planning} onValueChange={(v: UserPlanningType) => setPlanning(v)}>
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
				       onChange={(event) => {setExpire(event.currentTarget.value)}}/>
			</td>
			
			<td>
				<input type={'number'} defaultValue={user.chatgpt.balance}
				       onChange={(event) => {setTokens(parseInt(event.currentTarget.value))}}/>
			</td>
			
			<td className={'inline-flex items-center'}>
				<Button onClick={async () => {
					await updateUserPlanning(user.basic.id, planning, expire, tokens)
				}}>Confirm</Button>
			</td>
		</tr>
	)
}
