import { useU } from '@/hooks/use-u'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import ProfileForm from '@/components/form'

export const Signin = () => {
	const u = useU()
	
	return (
		<AuthLayout title={u.routers.auth.signin}>
			
			<ProfileForm/>
		
		</AuthLayout>
	)
}

export default Signin
