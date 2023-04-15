import { AdminUserLineComp } from '@/components/shared/AdminUserLineComp'
import { u } from '@/config'
import { RootLayout } from '@/layouts/RootLayout'
import { useListUserStatesQuery } from '@/api/adminApi'
import { useUser } from '@/hooks/use-user'
import { CentralLoadingComp } from '@/components/views/CentralLoadingComp'

export const AdminPage = () => {
	
	const user = useUser()
	const { data: users = [], isLoading } = useListUserStatesQuery(undefined, { skip: user.basic.role !== 'admin' })
	
	return (
		<RootLayout title={u.routes.admin.home}>
			{
				isLoading ? <CentralLoadingComp/> : (
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
				)
			}
		</RootLayout>
	)
}

export default AdminPage


