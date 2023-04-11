import { UserState } from '@/states/features/userSlice'
import { RootLayout } from '@/layouts/RootLayout'
import { AvatarView } from '@/components/views/AvatarView'
import { listUserStates } from '@/api/user/state'

export const SponsorsPage = ({ users }: {
	users: UserState[]
}) => {
	return (
		<RootLayout title={'Sponsors'}>
			<div className={'w-full flex flex-wrap justify-center'}>
				{users.map((user) => (
					<AvatarView className={'w-24 h-24'} user={user.basic} key={user.basic.id}/>
				))}
			</div>
		</RootLayout>
	)
}

export const getServerSideProps = async () => {
	return {
		props: {
			users: await listUserStates(),
		},
	}
}


export default SponsorsPage
