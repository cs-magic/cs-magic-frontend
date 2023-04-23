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
import { routers } from '@/config/routers'

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
					<Link href={routers.user.planning} legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							{u.routers.user.planning}
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				
				<NavigationMenuItem>
					<Link href={routers.abouts.contactUS} legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							{u.routers.abouts.contactUS}
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				
				<NavigationMenuItem>
					<SelectTheme withIconPrefix/>
				</NavigationMenuItem>
				
				<NavigationMenuItem>
					<SelectLang withIconPrefix/>
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
			
			<Link href={user ? `/user/${user.id}` : `/auth/signin`} className={'cursor-pointer'}>
				<UserAvatarView user={user}/>
			</Link>
		
		</div>
	)
}
