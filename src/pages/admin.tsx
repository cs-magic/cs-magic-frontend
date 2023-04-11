import { RootLayout } from '@/layouts/RootLayout'
import { AdminUserLineComp } from '@/components/shared/AdminUserLineComp'
import { ScrollArea } from '@/components/ui/scroll-area'
import { selectUserBasic, UserState } from '@/states/features/userSlice'
import { useAppSelector } from '@/states/hooks'
import { UserRole } from '@/ds/user'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { listUsers } from '@/api/user'
import { IconRotate } from '@tabler/icons-react'

export const AdminPage = () => {
	const router = useRouter()
	const userBasic = useAppSelector(selectUserBasic)
	const [users, setUsers] = useState<UserState[]>([])
	
	const [isLoading, setLoading] = useState(true)
	
	useEffect(() => {
		console.log({ userBasic })
		// 1. 首次访问页面，是没有id的init状态
		// 2. 接着基于 RootLayout 获得用户信息
		// 3. 接着基于用户信息再决定是否要跳转或者加载列表内容
		if (userBasic.id) {
			if (userBasic.role !== UserRole.admin) {
				router.push('/error/NotGranted')
			} else {
				listUsers().then(setUsers)
					.finally(() => setLoading(false))
			}
		}
	}, [userBasic])
	
	
	return (
		<RootLayout title={'控制台'}>
			{
				isLoading
					? <IconRotate className={'animate-spin'}/>
					: <ScrollArea className={'h-full w-full'}>
						<table className={'table table-compact'}>
							<thead>
							<tr>
								<th></th>
								<th>id</th>
								<th>name</th>
								<th>avatar</th>
								<th>email</th>
								<th>role</th>
								<th>planning</th>
								<th>expire</th>
								<th>chatgpt-tokens</th>
								<th>Notes</th>
								<th>operations</th>
							</tr>
							</thead>
							
							<tbody>
							{
								users.map((user, index) =>
									<AdminUserLineComp user={user} index={index} key={index}/>)
							}
							</tbody>
						</table>
					</ScrollArea>
			}
		</RootLayout>
	)
}

export default AdminPage
