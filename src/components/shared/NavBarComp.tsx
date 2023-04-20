import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { UserProfileComp } from '@/components/shared/UserProfileComp'
import { routers } from '@/config'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import { getI18NName, getTitle } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { selectLang, selectU, setLang } from '@/states/features/i18nSlice'
import { clsx } from 'clsx'
import { FooterView } from '@/components/views/FooterView'

export const NavBarComp = ({ title }: { title?: string }) => {
	const dispatch = useAppDispatch()
	const lang = useAppSelector(selectLang)
	const u = useAppSelector(selectU)
	
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
					
					{/*<DropdownMenuGroup>*/}
					{/*	<Link href={routers.home.href}><DropdownMenuItem className={'cursor-pointer'}>{getI18NName(u, routers.home.nameKey)}</DropdownMenuItem></Link>*/}
					{/*</DropdownMenuGroup>*/}
					{/*<DropdownMenuSeparator/>*/}
					
					{/*<DropdownMenuGroup>*/}
					{/*	<Link href={u.projects.chatGPT.href}><DropdownMenuItem className={'cursor-pointer'}>{u.projects.chatGPT.name}</DropdownMenuItem></Link>*/}
					{/*	<Link href={u.projects.dalle.href}><DropdownMenuItem className={'cursor-pointer'}>{u.projects.dalle.name}</DropdownMenuItem></Link>*/}
					{/*</DropdownMenuGroup>*/}
					{/*<DropdownMenuSeparator/>*/}
					
					{/*<DropdownMenuGroup>*/}
					{/*	<Link href={routers.userPlanning.href}><DropdownMenuItem className={'cursor-pointer'}>{getI18NName(u, routers.userPlanning.nameKey)}</DropdownMenuItem></Link>*/}
					{/*	<Link href={routers.wallMessages.href}><DropdownMenuItem className={'cursor-pointer'}>{getI18NName(u, routers.wallMessages.nameKey)}</DropdownMenuItem></Link>*/}
					{/*</DropdownMenuGroup>*/}
					{/*<DropdownMenuSeparator/>*/}
					
					{/*<DropdownMenuGroup>*/}
					{/*	<DropdownMenuItem className={'cursor-pointer'} onClick={() => dispatch(setLang(lang === 'zh' ? 'en' : 'zh'))}>*/}
					{/*		<span className={clsx(lang === 'zh' && 'text-primary')}>中</span>*/}
					{/*		<span className={'px-2'}>/</span>*/}
					{/*		<span className={clsx(lang === 'en' && 'text-primary')}>EN</span>*/}
					{/*	</DropdownMenuItem>*/}
					{/*</DropdownMenuGroup>*/}
					{/*<DropdownMenuSeparator/>*/}
					
					{/*<DropdownMenuGroup>*/}
					{/*	<Link href={routers.aboutVersions.href}><DropdownMenuItem className={'cursor-pointer'}>{getI18NName(u, routers.aboutVersions.nameKey)}</DropdownMenuItem></Link>*/}
					{/*	<Link href={routers.aboutSponsors.href}><DropdownMenuItem className={'cursor-pointer'}>{getI18NName(u, routers.aboutSponsors.nameKey)}</DropdownMenuItem></Link>*/}
					{/*	<Link href={routers.aboutUS.href}><DropdownMenuItem className={'cursor-pointer'}>{getI18NName(u, routers.aboutUS.nameKey)}</DropdownMenuItem></Link>*/}
					{/*</DropdownMenuGroup>*/}
				
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
