import { AdminUserLineComp } from '@/components/shared/AdminUserLineComp'
import { selectUserBasic } from '@/states/features/userSlice'
import { useAppSelector } from '@/states/hooks'
import { UserRole, UserState } from '@/ds/user'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IconRotate } from '@tabler/icons-react'
import { listUserStates } from '@/api/user/state'
import { u } from '@/config'
import { CentralLayout } from '@/layouts/CentralLayout'
import { RootLayout } from '@/layouts/RootLayout'

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
				listUserStates().then(setUsers)
					.finally(() => setLoading(false))
			}
		}
	}, [userBasic])
	
	if (isLoading) return (
		<CentralLayout title={u.routes.admin.home}>
			<IconRotate className={'animate-spin'}/>
		</CentralLayout>
	)
	
	return (
		<RootLayout title={u.routes.admin.home}>
			<table className={'table table-compact w-full h-full overflow-auto'}>
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
					<th>balance</th>
					<th>consumption</th>
					<th>cnt</th>
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
		</RootLayout>
	)
}

export default AdminPage
