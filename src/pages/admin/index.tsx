import { listUsers } from '@/api/user'
import { RootLayout } from '@/layouts/RootLayout'
import { AdminUserLineComp } from '@/components/shared/AdminUserLineComp'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/states/hooks'
import { selectUserId, UserState } from '@/states/features/userSlice'
import { ScrollArea } from '@/components/ui/scroll-area'

export const AdminPage = () => {
	const userId = useAppSelector(selectUserId)
	const [userList, setUserList] = useState<UserState[]>([])
	
	const granted = ['877210964@qq.com', 'shawninjuly@gmail.com'].includes(userId)
	
	
	useEffect(() => {
		if (granted) {
			listUsers().then((data) => {
				setUserList(data)
			})
		}
	}, [userId])
	
	
	return (
		<RootLayout title={'控制台'}>
			{
				!granted ? 'Not Granted' : (
					<ScrollArea className={'h-full w-full'}>
						<table className={'table w-full'}>
							<thead>
							<tr>
								<th></th>
								<th>id</th>
								<th>name</th>
								<th>email</th>
								<th>planning</th>
								<th>expire</th>
								<th>chatgpt-tokens</th>
								<th>operations</th>
							</tr>
							</thead>
							
							<tbody>
							{
								userList.map((user, index) =>
									<AdminUserLineComp user={user} index={index} key={user.basic.id}/>)
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

