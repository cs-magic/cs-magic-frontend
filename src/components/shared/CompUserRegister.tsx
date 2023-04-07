import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export const CompUserRegister = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'destructive'}>Register</Button>
			</DialogTrigger>
			
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Register Your Account</DialogTitle>
				</DialogHeader>
				
				<p>register</p>
			</DialogContent>
		</Dialog>
	)
}
