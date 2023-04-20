import { RootLayout } from '@/layouts/RootLayout'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useGetUserQuery } from '@/api/userApi'
import { CentralLayout } from '@/layouts/CentralLayout'

export const UserPage = () => {
	const router = useRouter()
	
	const user_id = router.query.user_id as string
	
	const {data: userData} = useGetUserQuery(user_id)
	
	console.log({userData})
	
	return (
		<CentralLayout>
			user page
		</CentralLayout>
	)
}

export default UserPage


