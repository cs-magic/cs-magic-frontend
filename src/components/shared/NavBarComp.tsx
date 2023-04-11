import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { NavbarAvatarComp } from '@/components/shared/NavbarAvatarComp'
import { navbarItems, u } from '@/config'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import { ReactNode } from 'react'

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
					
					{
						navbarItems
							.map((group, groupIndex) => (
								<DropdownMenuGroup key={groupIndex}>
									{
										group.map((item, itemIndex) =>
											<Link href={item.href} key={itemIndex}>
												<DropdownMenuItem className={'cursor-pointer'}>
													{item.name}
												</DropdownMenuItem>
											</Link>)
									}
								</DropdownMenuGroup>
							))
							.reduce((prev: ReactNode[], curr) => [...prev, <DropdownMenuSeparator key={'DropdownMenuSeparator-' + prev.length}/>, curr], [])
					}
				
				</DropdownMenuContent>
			
			</DropdownMenu>
			
			<div className="btn btn-ghost normal-case text-xl flex-1 truncate">
				<p className={'hidden md:block w-full truncate'}>{title ? [u.website.platformName, title].join(' | ') : u.website.platformName}</p>
				<p className={'md:hidden'}>{title || u.website.platformName}</p>
			</div>
			
			<NavbarAvatarComp/>
		</div>
	)
}
