import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { selectLang, selectU } from '@/states/features/i18nSlice'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SelectLang } from '@/components/general/SelectLang'
import { SelectTheme } from '@/components/general/SelectTheme'


export const FooterView = () => {
	const dispatch = useAppDispatch()
	const lang = useAppSelector(selectLang)
	const u = useAppSelector(selectU)
	
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()
	
	useEffect(() => setMounted(true), [])
	
	if (!mounted) return <></> // avoid hydration error, ref: https://www.npmjs.com/package/next-themes#avoid-hydration-mismatch
	
	return (
		<>
			<footer className="flex flex-wrap justify-around p-4 text-sm flex-col md:flex-row gap-4">
				
				<div className={'flex flex-col gap-2'}>
					<div className={'text-slate-500 font-semibold'}>{u.display.navs.user}</div>
					{Object.values(u.user).map((item) => (
						<Link href={item.href} key={item.name}>{item.name}</Link>
					))}
				</div>
				
				
				<div className={'flex flex-col gap-2'}>
					<div className={'text-slate-500 font-semibold'}>{u.display.navs.services}</div>
					{Object.values(u.projects).map((item) => (
						<Link href={item.href} key={item.name}>{item.name}</Link>
					))}
				</div>
				
				
				<div className={'flex flex-col gap-2'}>
					<div className={'text-slate-500 font-semibold'}>{u.display.navs.settings.index}</div>
					<SelectTheme withText disableIcon/>
					<SelectLang withText disableIcon/>
				</div>
				
				
				<div className={'flex flex-col gap-2'}>
					<div className={'text-slate-500 font-semibold'}>{u.display.navs.about}</div>
					{Object.values(u.abouts).map((item) => (
						<Link href={item.href} key={item.name}>{item.name}</Link>
					))}
					{/*<Link href={u.abouts.contactUS.href}>{u.abouts.contactUS.name}</Link>*/}
				</div>
				
				<div className={'flex flex-col gap-2'}>
					<div className={'text-slate-500 font-semibold'}>{u.display.navs.legal}</div>
					{Object.values(u.legals).map((item) => (
						<Link href={item.href} key={item.name}>{item.name}</Link>
					))}
				</div>
			
			</footer>
		</>
	)
}
