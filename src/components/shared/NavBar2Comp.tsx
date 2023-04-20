import { FooterView } from '@/components/views/FooterView'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import { UserProfileComp } from '@/components/shared/UserProfileComp'
import Link from 'next/link'
import { SeparatorVertical } from 'lucide-react'
import Image from 'next/image'

export const NavBar2Comp = () => {
	const u = useAppSelector(selectU)
	
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
				
				<Image src={'/logo-transparent.png'} alt={'logo'} width={36} height={36} className={'hidden md:block'}/>
				<a className="btn btn-ghost normal-case text-xl">{u.website.platformName}</a>
			</div>
			
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					{Object.values(u.projects).map((project, index) => (
						<li key={index}>
							<Link href={project.href} >{project.name}</Link>
						</li>
					))}
				</ul>
			</div>
			
			<div className="navbar-end">
				{/*<a className="btn">Kick Start</a>*/}
				<UserProfileComp/>
			</div>
		
		</div>
	)
}
