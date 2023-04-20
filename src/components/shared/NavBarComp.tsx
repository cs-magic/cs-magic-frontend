import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { UserProfileComp } from '@/components/shared/UserProfileComp'
import { routers } from '@/config'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import { getTitle } from '@/lib/utils'

export interface INavbarItem {
	href: string
	name: string
}

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
					
					
					<DropdownMenuGroup>
						<Link href={routers.home.href}><DropdownMenuItem className={'cursor-pointer'}>{routers.home.name}</DropdownMenuItem></Link>
					</DropdownMenuGroup>
					<DropdownMenuSeparator/>
					
					<DropdownMenuGroup>
						<Link href={routers.appChatChatGPT.href}><DropdownMenuItem className={'cursor-pointer'}>{routers.appChatChatGPT.name}</DropdownMenuItem></Link>
						<Link href={routers.appChatDalle.href}><DropdownMenuItem className={'cursor-pointer'}>{routers.appChatDalle.name}</DropdownMenuItem></Link>
					</DropdownMenuGroup>
					<DropdownMenuSeparator/>
					
					<DropdownMenuGroup>
						<Link href={routers.userPlanning.href}><DropdownMenuItem className={'cursor-pointer'}>{routers.userPlanning.name}</DropdownMenuItem></Link>
						<Link href={routers.wallMessages.href}><DropdownMenuItem className={'cursor-pointer'}>{routers.wallMessages.name}</DropdownMenuItem></Link>
					</DropdownMenuGroup>
					<DropdownMenuSeparator/>
					
					<DropdownMenuGroup>
						<Link href={routers.aboutVersions.href}><DropdownMenuItem className={'cursor-pointer'}>{routers.aboutVersions.name}</DropdownMenuItem></Link>
						<Link href={routers.aboutSponsors.href}><DropdownMenuItem className={'cursor-pointer'}>{routers.aboutSponsors.name}</DropdownMenuItem></Link>
						<Link href={routers.aboutUS.href}><DropdownMenuItem className={'cursor-pointer'}>{routers.aboutUS.name}</DropdownMenuItem></Link>
					</DropdownMenuGroup>
				
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
