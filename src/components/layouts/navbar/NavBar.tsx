import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import Link from 'next/link'
import { useUser } from '@/hooks/use-user'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { SelectTheme } from '@/components/general/SelectTheme'
import { SelectLang } from '@/components/general/SelectLang'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { FooterView } from '@/components/layouts/footer/FooterView'
import { LogoHomeView } from '@/components/layouts/navbar/LogoHomeView'
import { UserAvatarView } from '@/components/general/UserAvatarView'
import { HTMLAttributes } from 'react'
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu'
import { routers } from '@/config/routers'
import { clsx } from 'clsx'
import { NavigationMenuDemo } from '@/components/layouts/navbar/Custom'

export const HorizontalMenus = (props: NavigationMenuProps) => {
	const u = useAppSelector(selectU)
	const user = useUser()
	
	return (
		// 它不支持 vertical
		<NavigationMenu {...props}>
			<NavigationMenuList>
				
				{user?.basic.role === 'admin' && (
					<DropdownMenu>
						<DropdownMenuTrigger>
							<NavigationMenuItem>
								<NavigationMenuLink className={clsx(navigationMenuTriggerStyle(), 'font-black text-purple-500')}>
									Admin
								</NavigationMenuLink>
							</NavigationMenuItem>
						</DropdownMenuTrigger>
						
						<DropdownMenuContent>
							<Link href={routers.admin.console}>
								<DropdownMenuItem>
									{u.routers.admin.console}
								</DropdownMenuItem>
							</Link>
							
							<DropdownMenuSeparator/>
							
							<Link href={`/wechat?wxid=${user.id}`}>
								<DropdownMenuItem>
									{u.routers.admin.wechat}
								</DropdownMenuItem>
							</Link>
						
						</DropdownMenuContent>
					</DropdownMenu>
				)}
				
				{
					Object.values(u.apps).map((project, index) => (
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
					<Link href={routers.about.contactUS} legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							{u.routers.about.contactUS}
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				
				<NavigationMenuItem>
					<Link href={'/docs'} legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							{'文档'}
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
		<div className={'inline-flex items-center justify-between p-2'}>
			<LogHomeViewWithDropdownMenus className={'md:hidden'}/>
			<LogoHomeView className={'hidden md:flex'}/>
			
			{/*<HorizontalMenus className={'hidden md:flex'}/>*/}
			<NavigationMenuDemo className={'hidden md:flex'}/>
			
			<Link href={user ? `/user/${user.id}` : `/auth/signin`} className={'cursor-pointer'}>
				<UserAvatarView user={user}/>
			</Link>
		
		</div>
	)
}
