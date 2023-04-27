import { AdminUserLineComp } from '@/components/admin/AdminUserLineComp'
import { RootLayout } from '@/components/layouts/RootLayout'
import { useUser } from '@/hooks/use-user'
import { CentralLoadingComp } from '@/components/general/CentralLoadingComp'
import { useListAllUserQuery } from '@/api/userApi'
import { useU } from '@/hooks/use-u'

export const AdminPage = () => {
	const u = useU()
	const user = useUser()
	const { data: users = [], isLoading } = useListAllUserQuery(undefined, { skip: !user || user.basic.role !== 'admin' })
	
	return (
		<RootLayout title={u.routers.admin.console}>
			{
				isLoading ? <CentralLoadingComp/> : (
					<table className={'table table-compact w-full max-h-full overflow-auto'}>
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


