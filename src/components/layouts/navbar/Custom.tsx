'use client'

import * as React from 'react'
import { HTMLAttributes } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { LogoHomeView } from '@/components/layouts/navbar/LogoHomeView'

const services: { title: string; href: string; description: string }[] = [
	{
		title: 'Text to Text',
		href: '/docs/primitives/alert-dialog',
		description:
			'ChatGPT 3.5, ChatGPT 4,  Claude, …',
	},
	{
		title: 'Text to Image',
		href: '/docs/primitives/hover-card',
		description:
			'MidJourney, Stable Diffusion, …',
	},
	{
		title: 'Text to Voice',
		href: '/docs/primitives/progress',
		description:
			'…',
	},
	{
		title: 'Text to Video',
		href: '/docs/primitives/progress',
		description:
			'…',
	},
	{
		title: 'Image to Image',
		href: '/docs/primitives/progress',
		description:
			'MidJourney, Stable Diffusion, …',
	},
	{
		title: 'Image to Text',
		href: '/docs/primitives/progress',
		description:
			'Stable Diffusion, …',
	},
	{
		title: 'Voice to Text',
		href: '/docs/primitives/progress',
		description:
			'Whisper, …',
	},
]


const scenarios: { title: string; href: string; description: string }[] = [
	{
		title: 'AIGC数字孪生',
		href: '/docs/primitives/alert-dialog',
		description:
			'…',
	},
	{
		title: 'AIGC线稿转渲染',
		href: '/docs/primitives/alert-dialog',
		description:
			'…',
	},
	{
		title: 'AIGC广告文案',
		href: '/docs/primitives/alert-dialog',
		description:
			'…',
	},
	{
		title: 'AIGC游戏',
		href: '/docs/primitives/alert-dialog',
		description:
			'…',
	},
]

export function NavigationMenuDemo(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<NavigationMenu {...props}>
			<NavigationMenuList>
				
				<NavigationMenuItem>
					<NavigationMenuTrigger>开始</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<Link
										className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
										href="/"
									>
										<LogoHomeView/>
										{/*<LogoSVG className="h-6 w-6"/>*/}
										{/*<div className="mb-2 mt-4 text-lg font-medium">*/}
										{/*	CS Magic*/}
										{/*</div>*/}
										<p className="text-sm leading-tight text-muted-foreground">
											Unleash Infinite AGI Magic.
										</p>
									</Link>
								</NavigationMenuLink>
							</li>
							
							
							<ListItem href="/docs/installation" title="AIGC Tutorial">
								AIGC教程
							</ListItem>
							
							<ListItem href="/docs/installation" title="Wechat Bot Tutorial">
								微信机器人教程
							</ListItem>
							
							<ListItem href="/docs" title="About US">
								关于我们
							</ListItem>
						
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				
				<NavigationMenuItem>
					<NavigationMenuTrigger>API服务</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
							{services.map((item) => (
								<ListItem
									key={item.title}
									title={item.title}
									href={item.href}
								>
									{item.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				
				<NavigationMenuItem>
					<NavigationMenuTrigger>解决方案</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
							{scenarios.map((item) => (
								<ListItem
									key={item.title}
									title={item.title}
									href={item.href}
								>
									{item.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				
				<NavigationMenuItem>
					<Link href="/community" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							社区
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			
			</NavigationMenuList>
		</NavigationMenu>
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
