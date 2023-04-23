import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import Link from 'next/link'
import { useUser } from '@/hooks/use-user'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { SelectTheme } from '@/components/general/SelectTheme'
import { SelectLang } from '@/components/general/SelectLang'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { FooterView } from '@/components/layouts/footer/FooterView'
import { LogoHomeView } from '@/components/layouts/navbar/LogoHomeView'
import { UserAvatarView } from '@/components/general/UserAvatarView'
import { HTMLAttributes } from 'react'
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu'

export const HorizontalMenus = (props: NavigationMenuProps) => {
	const u = useAppSelector(selectU)
	const user = useUser()
	
	return (
		// 它不支持 vertical
		<NavigationMenu {...props}>
			<NavigationMenuList>
				
				{
					Object.values(u.projects).map((project, index) => (
						<NavigationMenuItem key={index}>
							<Link href={project.href} legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									{project.name}
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					))
				}
				
				<NavigationMenuItem>
					<Link href={u.user.planning.href} legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							{u.user.planning.name}
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				
				<NavigationMenuItem>
					<Link href={u.abouts.contactUS.href} legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							{u.abouts.contactUS.name}
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				
				<NavigationMenuItem>
					<SelectTheme/>
				</NavigationMenuItem>
				
				<NavigationMenuItem>
					<SelectLang/>
				</NavigationMenuItem>
			
			</NavigationMenuList>
		</NavigationMenu>
	
	)
}


export const LogHomeViewWithDropdownMenus = (props: HTMLAttributes<HTMLElement>) => (
	<DropdownMenu>
		<DropdownMenuTrigger {...props}>
			<LogoHomeView/>
			{/*<IconMenu2/>*/}
		</DropdownMenuTrigger>
		
		<DropdownMenuContent>
			<FooterView/>
		</DropdownMenuContent>
	</DropdownMenu>
)

export const NavBarResponsive = () => {
	const user = useUser()
	
	return (
		<div className={'inline-flex items-center justify-between px-2'}>
			<LogHomeViewWithDropdownMenus className={'md:hidden'}/>
			<LogoHomeView className={'hidden md:flex'}/>
			
			<HorizontalMenus className={'hidden md:flex'}/>
			
			{
				user ? (
					<Link href={`/user/${user.id}`} className={'cursor-pointer'}>
						<UserAvatarView user={user}/>
					</Link>
				) : <UserAvatarView user={user}/>
			}
		
		</div>
	)
}
