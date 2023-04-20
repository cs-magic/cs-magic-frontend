import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { UserProfileComp } from '@/components/shared/UserProfileComp'
import { getTitle } from '@/lib/utils'
import { FooterView } from '@/components/views/FooterView'

export const NavBarComp = ({ title }: { title?: string }) => {
	
	return (
		<div className="w-full shrink-0 inline-flex items-center px-2 gap-2">
			
			<DropdownMenu>
				
				<DropdownMenuTrigger className={'md:hidden'}>
					<label tabIndex={0} className="btn btn-ghost btn-circle">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/>
						</svg>
					</label>
				</DropdownMenuTrigger>
				
				<DropdownMenuContent>
					
					<FooterView/>
				
				</DropdownMenuContent>
			
			</DropdownMenu>
			
			<div className="btn btn-ghost normal-case text-xl flex-1 truncate">
				<p className={'hidden md:block w-full truncate'}>{getTitle(title, true)}</p>
				<p className={'md:hidden'}>{getTitle(title, false)}</p>
			</div>
			
			<UserProfileComp/>
		</div>
	)
}
