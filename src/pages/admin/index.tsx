import { listUsers } from '@/api/user'
import { RootLayout } from '@/layouts/RootLayout'
import { AdminUserLineComp } from '@/components/shared/AdminUserLineComp'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/states/hooks'
import { selectUserId, UserState } from '@/states/features/userSlice'
import { ScrollArea } from '@/components/ui/scroll-area'
import { adminIds } from '@/config'

export const AdminPage = () => {
	const userId = useAppSelector(selectUserId)
	const [userList, setUserList] = useState<UserState[]>([])
	
	const isGrantedUser = adminIds.includes(userId)
	
	useEffect(() => {
		if (isGrantedUser) {
			listUsers().then((data) => {
				setUserList(data)
			})
		}
	}, [userId])
	
	
	return (
		<RootLayout title={'控制台'}>
			{
				!isGrantedUser ? 'Not Granted' : (
					<ScrollArea className={'h-full w-full'}>
						<table className={'table table-compact'}>
							<thead>
							<tr>
								<th></th>
								<th>id</th>
								<th>name</th>
								<th>avatar</th>
								<th>email</th>
								<th>planning</th>
								<th>expire</th>
								<th>chatgpt-tokens</th>
								<th>Notes</th>
								<th>operations</th>
							</tr>
							</thead>
							
							<tbody>
							{
								userList.map((user, index) =>
									<AdminUserLineComp user={user} index={index} key={index}/>)
							}
							</tbody>
						</table>
					</ScrollArea>
				)
			}
		</RootLayout>
	)
}

export default AdminPage

