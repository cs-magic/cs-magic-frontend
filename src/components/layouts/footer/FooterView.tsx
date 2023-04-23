import Link from 'next/link'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import { SelectLang } from '@/components/general/SelectLang'
import { SelectTheme } from '@/components/general/SelectTheme'
import { routers } from '@/config/routers'
import _ from 'lodash'


export const FooterView = () => {
	const u = useAppSelector(selectU)
	
	return (
		<>
			<footer className="flex flex-wrap justify-around p-4 text-sm flex-col md:flex-row gap-4">
				
				<div className={'flex flex-col gap-2'}>
					<div className={'text-slate-500 font-semibold'}>{u.display.navs.user}</div>
					{Object.values(routers.user).map((item) => (
						<Link href={item} key={item}>{_.get(u, item)}</Link>
					))}
				</div>
				
				
				<div className={'flex flex-col gap-2'}>
					<div className={'text-slate-500 font-semibold'}>{u.display.navs.services}</div>
					{Object.values(u.apps).map((item) => (
						<Link href={item.href} key={item.name}>{item.name}</Link>
					))}
				</div>
				
				
				<div className={'flex flex-col gap-2'}>
					<div className={'text-slate-500 font-semibold'}>{u.display.navs.settings.index}</div>
					<SelectTheme withText/>
					<SelectLang withText/>
				</div>
				
				
				<div className={'flex flex-col gap-2'}>
					<div className={'text-slate-500 font-semibold'}>{u.display.navs.about}</div>
					{Object.values(routers.abouts).map((item) => (
						<Link href={item} key={item}>{_.get(u, item)}</Link>
					))}
					{/*<Link href={u.abouts.contactUS.href}>{u.abouts.contactUS.name}</Link>*/}
				</div>
				
				<div className={'flex flex-col gap-2'}>
					<div className={'text-slate-500 font-semibold'}>{u.display.navs.legal}</div>
					{Object.values(routers.legals).map((item) => (
						<Link href={item} key={item}>{_.get(u, item)}</Link>
					))}
				</div>
			
			</footer>
		</>
	)
}
