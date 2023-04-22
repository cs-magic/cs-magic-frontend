import { AdminUserLineComp } from '@/components/AdminUserLineComp'
import { RootLayout } from '@/components/layouts/RootLayout'
import { useUser } from '@/hooks/use-user'
import { CentralLoadingComp } from '@/components/CentralLoadingComp'
import { useListAllUserQuery } from '@/api/userApi'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'

export const AdminPage = () => {
	const u = useAppSelector(selectU)
	const user = useUser()
	const { data: users = [], isLoading } = useListAllUserQuery(undefined, { skip: !user || user.basic.role !== 'admin' })
	
	return (
		<RootLayout title={u.routes.admin.home}>
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


