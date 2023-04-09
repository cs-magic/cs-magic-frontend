import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { NavbarAvatarComp } from '@/components/shared/NavbarAvatarComp'
import { platformName } from '@/config'

export const NavBarComp = ({ title }: { title?: string }) => {
	
	return (
		<div className="w-full shrink-0 inline-flex items-center px-2 gap-2">
			
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
			
			<div className="btn btn-ghost normal-case text-xl flex-1 truncate">
				<p className={'hidden md:block w-full truncate'}>{[platformName, title].join(' | ')}</p>
				<p className={'md:hidden'}>{title || platformName}</p>
			</div>
			
			<NavbarAvatarComp/>
		</div>
	)
}
