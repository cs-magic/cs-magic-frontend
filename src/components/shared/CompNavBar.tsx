import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useAppSelector } from '@/states/hooks'
import { selectUser } from '@/states/features/user'
import { useToast } from '@/hooks/use-toast'

export const CompNavBar = ({ title }: { title: string }) => {
	const user = useAppSelector(selectUser)
	const { toast } = useToast()
	
	return (
		<div className="navbar bg-base-100">
			<div className="navbar-start">
				
				<DropdownMenu>
					
					<DropdownMenuTrigger>
						<label tabIndex={0} className="btn btn-ghost btn-circle">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/>
							</svg>
						</label>
					</DropdownMenuTrigger>
					
					<DropdownMenuContent>
						<DropdownMenuItem asChild><Link href={'/'} className={'cursor-pointer'}>HomePage</Link></DropdownMenuItem>
						{/*<DropdownMenuItem>About</DropdownMenuItem>*/}
					</DropdownMenuContent>
				
				</DropdownMenu>
			
			</div>
			
			<div className="navbar-center">
				<a className="btn btn-ghost normal-case text-xl">CS魔法社 | {title}</a>
			</div>
			
			<div className={'navbar-end'}>
				<Avatar
					className={'cursor-pointer'}
					onClick={() => {
						toast({ title: 'todo', variant: 'destructive' })
					}}>
					<AvatarFallback>{user.name ? user.name[0] : 'U'}</AvatarFallback>
				</Avatar>
			</div>
		</div>
	)
}
