import Link from 'next/link'
import { useUser } from '@/hooks/use-user'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { SelectTheme } from '@/components/general/SelectTheme'
import { SelectLang } from '@/components/general/SelectLang'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { FooterView } from '@/components/layouts/footer/FooterView'
import { LogoHomeView } from '@/components/layouts/navbar/LogoHomeView'
import { UserAvatar } from '@/components/user/UserAvatar'
import React, { HTMLAttributes } from 'react'
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu'
import { routers } from '@/config/routers'
import { clsx } from 'clsx'
import { useApps } from '@/hooks/use-apps'
import { useU } from '@/hooks/use-u'
import { cn } from '@/lib/utils'

export const HorizontalMenus = (props: NavigationMenuProps) => {
	const u = useU()
	const apps = useApps()
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
				
				{/*{*/}
				{/*	apps*/}
				{/*		.map(([projectName, project], index) => (*/}
				{/*			<NavigationMenuItem key={index}>*/}
				{/*				<Link href={project.href} legacyBehavior passHref>*/}
				{/*					<NavigationMenuLink className={navigationMenuTriggerStyle()}>*/}
				{/*						{project.name}*/}
				{/*					</NavigationMenuLink>*/}
				{/*				</Link>*/}
				{/*			</NavigationMenuItem>*/}
				{/*		))*/}
				{/*}*/}
				
				<NavigationMenuItem>
					<NavigationMenuTrigger>
						ChatGPT
					</NavigationMenuTrigger>
					
					<NavigationMenuContent>
						<ul className="grid w-[320px] gap-3 p-4">
							
							<ListItem href={'/apps/chat/chatGPT'} title={'ChatGPT Traditional'}>
								传统 ChatGPT UI 模式
							</ListItem>
							
							<ListItem href={`/apps/chatgpt`} title={'ChatGPT Role Player'}>
								支持不同场景的角色扮演
							</ListItem>
							
							<ListItem href={`/apps/chatgpt`} title={'ChatGPT Soul Mate'} onClick={(event) => {
								event.preventDefault()
							}}
							          className={'text-muted-foreground'}
							>
								支持无限长度的情感陪聊（即将上线）
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				
				{/*<NavigationMenuItem>*/}
				{/*	<Link href={routers.user.planning} legacyBehavior passHref>*/}
				{/*		<NavigationMenuLink className={navigationMenuTriggerStyle()}>*/}
				{/*			{u.routers.user.planning}*/}
				{/*		</NavigationMenuLink>*/}
				{/*	</Link>*/}
				{/*</NavigationMenuItem>*/}
				
				{/* todo: contact via floating button */}
				{/*<NavigationMenuItem>*/}
				{/*	<Link href={routers.about.contactUS} legacyBehavior passHref>*/}
				{/*		<NavigationMenuLink className={navigationMenuTriggerStyle()}>*/}
				{/*			{u.routers.about.contactUS}*/}
				{/*		</NavigationMenuLink>*/}
				{/*	</Link>*/}
				{/*</NavigationMenuItem>*/}
				
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
			
			<HorizontalMenus className={'hidden md:flex'}/>
			
			<Link href={user ? `/user/${user.id}` : `/auth/signin`} className={'cursor-pointer'}>
				<UserAvatar user={user}/>
			</Link>
		
		</div>
	)
}


const ListItem = React.forwardRef<React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = 'ListItem'
