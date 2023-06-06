import Link from 'next/link'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import { SelectLang } from '@/components/general/SelectLang'
import { SelectTheme } from '@/components/general/SelectTheme'
import { routers } from '@/config/routers'
import _ from 'lodash'
import { Separator } from '@/components/ui/separator'


export const FooterView = () => {
	const u = useAppSelector(selectU)
	
	return (
		<>
			<footer className={'w-full flex flex-col items-center text-sm py-2'}>
				
				<div className={'w-full flex flex-wrap justify-around p-4 flex-col md:flex-row gap-4'}>
					
					<div className={'flex flex-col gap-2'}>
						<div className={'text-slate-500 font-bold'}>{u.display.navs.services}</div>
						{Object.values(u.apps).map((item) => (
							<Link href={item.href} key={item.name}>{item.name}</Link>
						))}
					</div>
					
					<Separator className={'md:hidden'}/>
					
					<div className={'flex flex-col gap-2'}>
						<div className={'text-slate-500 font-bold'}>{u.display.navs.user}</div>
						{Object.entries(routers.user).map(([key, href]) => (
							<Link href={href} key={href}>{_.get(u, `routers.user.${key}`)}</Link>
						))}
					</div>
					
					<Separator className={'md:hidden'}/>
					
					<div className={'flex flex-col gap-2'}>
						<div className={'text-slate-500 font-bold'}>{u.display.navs.settings.index}</div>
						<SelectTheme withText/>
						<SelectLang withText/>
					</div>
					
					<Separator className={'md:hidden'}/>
					
					<div className={'flex flex-col gap-2'}>
						<div className={'text-slate-500 font-bold'}>{u.display.navs.about}</div>
						{Object.entries(routers.about)
							// todo: better join-us page
							.filter(([key, href]) => ![routers.about.jobs].includes(href))
							.map(([key, href]) => (
								<Link href={href} key={href}>{_.get(u, `routers.about.${key}`)}</Link>
							))}
					</div>
					
					<Separator className={'md:hidden'}/>
					
					<div className={'flex flex-col gap-2'}>
						<div className={'text-slate-500 font-bold'}>{u.display.navs.legal}</div>
						{Object.entries(routers.legals).map(([key, href]) => (
							<Link href={href} key={href}>{_.get(u, `routers.legals.${key}`)}</Link>
						))}
					</div>
				
				</div>
				
				<Link href={'https://beian.miit.gov.cn/'} target={'_blank'} className={'text-gray-500'}>备案号：苏ICP备2023015349号-1</Link>
			
			</footer>
		
		
		</>
	)
}
