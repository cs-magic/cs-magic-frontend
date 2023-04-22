import { FooterView } from '@/components/FooterView'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import Link from 'next/link'
import { LogoHomeView } from '@/components/LogoHomeView'
import { UserAvatarView } from '@/components/UserAvatarView'
import { useUser } from '@/hooks/use-user'
import { SelectTheme } from '@/components/tooltips/SelectTheme'
import { SelectLang } from '@/components/tooltips/SelectLang'

export const NavBarView = () => {
	const u = useAppSelector(selectU)
	const user = useUser()
	
	return (
		<div className="navbar bg-base-100">
			
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/>
						</svg>
					</label>
					<ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 shadow bg-base-100 rounded-box w-[240px]">
						<FooterView/>
					</ul>
				</div>
				
				<LogoHomeView/>
			
			</div>
			
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					{Object.values(u.projects).map((project, index) => (
						<li key={index}>
							<Link href={project.href} className={'font-semibold'}>{project.name}</Link>
						</li>
					))}
					
					<li>
						<Link href={u.abouts.userPlanning.href} className={'text-accent font-semibold'}>{u.abouts.userPlanning.name}</Link>
					</li>
				</ul>
			</div>
			
			<div className="navbar-end">
				
				<SelectTheme/>
				
				<SelectLang/>
				
				<Link href={user ? `/user/${user.id}` : '/api/auth/signin'}>
					<UserAvatarView user={user} className={'w-8 h-8'}/>
				</Link>
			</div>
		
		</div>
	)
}
