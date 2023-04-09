import { GetServerSideProps } from 'next'
import { listUsers } from '@/api/user'
import { IUserBasic } from '@/ds/user'
import { RootLayout } from '@/components/layouts/RootLayout'
import { CompAdminUserLine } from '@/components/shared/CompAdminUserLine'

export const AdminPage = ({ users }: {
	users: IUserBasic[]
}) => {
	return (
		<RootLayout title={'控制台'}>
			<table className={'table w-full'}>
				<thead>
				<tr>
					<th></th>
					<th>id</th>
					<th>name</th>
					<th>email</th>
					<th>planning</th>
					<th>expire</th>
					<th>operations</th>
				</tr>
				</thead>
				
				<tbody>
				{
					users.map((user, index) =>
						<CompAdminUserLine user={user} index={index} key={user.id}/>)
				}
				</tbody>
			</table>
		</RootLayout>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	const users = await listUsers()
	return {
		props: {
			users,
		},
	}
}

export default AdminPage

