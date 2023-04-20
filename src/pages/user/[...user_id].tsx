import { RootLayout } from '@/layouts/RootLayout'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useGetUserQuery } from '@/api/userApi'

export const UserPage = () => {
	const router = useRouter()
	
	const user_id = router.query.user_id as string
	
	const {data: userData} = useGetUserQuery(user_id)
	
	console.log({userData})
	
	return (
		<RootLayout>
			user page
		</RootLayout>
	)
}

export default UserPage


