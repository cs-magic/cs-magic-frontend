import { GetServerSideProps } from 'next'
import { listUsers } from '@/api/user'
import { IUserBasic } from '@/ds/user'
import { RootLayout } from '@/components/layouts/RootLayout'

export const AdminPage = ({ users }: {
	users: IUserBasic[]
}) => {
	return (
		<RootLayout>
			<table className={'table w-full'}>
				<thead>
				<tr>
					<th></th>
					<th>id</th>
					<th>name</th>
					<th>email</th>
					<th>planning</th>
				</tr>
				</thead>
				
				<tbody>
				{
					users.map((user, index) => (
						<tr key={user.id} className={'overflow-x-auto'}>
							<th>{index + 1}</th>
							<td>{user.id}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.planning}</td>
						</tr>
					))
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

