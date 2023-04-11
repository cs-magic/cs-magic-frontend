import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { IconUser } from '@tabler/icons-react'
import { UserAccountComp } from '@/components/shared/UserAccountComp'

export const ChatgptAccountComp = () => {
	return (
					<Dialog>
				<DialogTrigger asChild>
					<Button
						variant={'ghost'}
						className="group w-full p-3 inline-flex justify-start items-center gap-2 hover:bg-[#2A2B32] cursor-pointer rounded-none border-b border-gray-200 dark:border-gray-700"
					>
						<IconUser/>
						My ChatGPT
					</Button>
				</DialogTrigger>
				
				<DialogContent>
					<UserAccountComp/>
				</DialogContent>
			</Dialog>
	)
}
