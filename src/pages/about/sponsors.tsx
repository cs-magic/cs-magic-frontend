import { CentralLayout } from '@/layouts/CentralLayout'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'

export const SponsorsPage = () => {
	const u = useAppSelector(selectU)
	
	return (
		<CentralLayout title={u.routes.about.sponsors}>
			{/*{users.map((user) => (*/}
			{/*	<AvatarView className={'w-24 h-24'} user={user.basic} key={user.basic.id}/>*/}
			{/*))}*/}
			todo
		</CentralLayout>
	)
}

export const getServerSideProps = async () => {
	return {
		props: {
			// users: await listUserStates(),
		},
	}
}


export default SponsorsPage
