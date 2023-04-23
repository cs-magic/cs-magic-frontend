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
			<footer className="flex flex-wrap justify-around p-4 text-sm flex-col md:flex-row gap-4">
				
				<div className={'flex flex-col gap-2'}>
					<div className={'text-slate-500 font-bold'}>{u.display.navs.user}</div>
					{Object.entries(routers.user).map(([key, href]) => (
						<Link href={href} key={href}>{_.get(u, `routers.user.${key}`)}</Link>
					))}
				</div>
				
				<Separator className={'md:hidden'}/>
				
				
				<div className={'flex flex-col gap-2'}>
					<div className={'text-slate-500 font-bold'}>{u.display.navs.services}</div>
					{Object.values(u.apps).map((item) => (
						<Link href={item.href} key={item.name}>{item.name}</Link>
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
					{Object.entries(routers.about).map(([key, href]) => (
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
			
			</footer>
		</>
	)
}
