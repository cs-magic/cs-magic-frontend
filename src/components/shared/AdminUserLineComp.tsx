import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateUserPlanning } from '@/api/user'
import { IUserBasic, UserPlanning } from '@/ds/user'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const AdminUserLineComp = ({ user, index }: {
	user: IUserBasic
	index: number
}) => {
	const [planning, setPlanning] = useState(user.planning)
	const [expire, setExpire] = useState(user.expire)
	
	return (
		<tr key={index} className={'overflow-x-auto'}>
			<th>{index + 1}</th>
			<th>{user.id}</th>
			<td>{user.name}</td>
			<td>{user.email}</td>
			<td>
				<Select defaultValue={planning} onValueChange={(v: UserPlanning) => setPlanning(v)}>
					<SelectTrigger>
						<SelectValue placeholder={'planning'}/>
					</SelectTrigger>
					
					<SelectContent>
						{Object.values(UserPlanning).map((planning) => (
							<SelectItem value={planning} key={planning}>{planning}</SelectItem>
						))}
					</SelectContent>
				</Select>
			</td>
			
			<td>
				<input type={'date'} defaultValue={user.expire || new Date().toISOString().split('T')[0]} step={31}
				       onChange={(event) => {setExpire(event.currentTarget.value)}}/>
			</td>
			
			<td className={'inline-flex items-center'}>
				<Button onClick={async () => {
					await updateUserPlanning(user.id, planning, expire)
				}}>Confirm</Button>
			</td>
		</tr>
	)
}
