import { IconBrandWechat } from '@tabler/icons-react'
import Image from 'next/image'
import { Tooltip, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { TooltipContent } from '@/components/ui/tooltip'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { selectLang, selectU } from '@/states/features/i18nSlice'
import { useTheme } from 'next-themes'
import { ContactView } from '@/components/contact/ContactView'
import { useEffect, useState } from 'react'
import { SelectLang } from '@/components/tooltips/SelectLang'
import { SelectTheme } from '@/components/tooltips/SelectTheme'
import { clsx } from 'clsx'


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
			<footer className="footer p-10">
				
				<div>
					<span className="footer-title">{u.display.navs.services}</span>
					{Object.values(u.projects).map((item) => (
						<Link href={item.href} key={item.name}>{item.name}</Link>
					))}
				</div>
				
				
				<div>
					<span className="footer-title">{u.display.navs.settings.index}</span>
					
					<SelectTheme withText disableIcon/>
					<SelectLang withText disableIcon/>
					
					{/*<div className="flex items-center gap-4">*/}
					{/*	<Label className={'shrink-0'} htmlFor="language">{u.display.navs.settings.language}</Label>*/}
					{/*	<Switch onCheckedChange={() => dispatch(setLangType(lang === 'zh' ? 'en' : 'zh'))}/>*/}
					{/*</div>*/}
					
					{/*<div className="flex items-center gap-4">*/}
					{/*	<Label className={'shrink-0'} htmlFor="theme">{u.display.navs.settings.theme}</Label>*/}
					{/*	<Select onValueChange={setTheme}>*/}
					{/*		<SelectTrigger id={'theme'}>*/}
					{/*			<SelectValue placeholder={theme}/>*/}
					{/*		</SelectTrigger>*/}
					{/*		*/}
					{/*		<SelectContent className={'bg-base-300'}>*/}
					{/*			<SelectGroup>*/}
					{/*				{themes.map((theme) => (*/}
					{/*					<SelectItem value={theme} key={theme}>{theme}</SelectItem>*/}
					{/*				))}*/}
					{/*			</SelectGroup>*/}
					{/*		</SelectContent>*/}
					{/*	</Select>*/}
					{/*</div>*/}
					
					
					{/*<div className={'form-control w-[48px]'}>*/}
					{/*	<label className="input-group cursor-pointer">*/}
					{/*		<span>Lang</span>*/}
					{/*		/!*<span className={clsx(lang === 'zh' && 'text-primary')}>中</span>*!/*/}
					{/*		/!*<span className={'px-0'}>/</span>*!/*/}
					{/*		/!*<span className={clsx(lang === 'en' && 'text-primary')}>EN</span>*!/*/}
					{/*		<input type="checkbox" className="toggle toggle-primary" checked={lang === 'en'} onChange={(event) => {*/}
					{/*			dispatch(setLang(lang === 'zh' ? 'en' : 'zh'))*/}
					{/*		}}/>*/}
					{/*	</label>*/}
					{/*</div>*/}
					
					{/*<div className={'form-control'}>*/}
					{/*	<div className={'input-group input-group-sm'}>*/}
					{/*		<span>Theme</span>*/}
					{/*		<select className="h-4 select select-bordered" onChange={(event) => {*/}
					{/*			setTheme(event.currentTarget.value)*/}
					{/*		}}>*/}
					{/*			<option disabled selected>{theme}</option>*/}
					{/*			{themes.map((theme) => (*/}
					{/*				<option key={theme}>{theme}</option>*/}
					{/*			))}*/}
					{/*		</select>*/}
					{/*	</div>*/}
					{/*</div>*/}
				
				</div>
				
				
				<div>
					<span className="footer-title">{u.display.navs.about}</span>
					{Object.values(u.abouts).map((item) => (
						<Link href={item.href} key={item.name}>{item.name}</Link>
					))}
				</div>
				
				<div>
					<span className="footer-title">{u.display.navs.legal}</span>
					{Object.values(u.legals).map((item) => (
						<Link href={item.href} key={item.name}>{item.name}</Link>
					))}
				</div>
			</footer>
			
			<footer className={clsx(
				'footer border-t flex items-center justify-center gap-4',
				'hidden' // todo: 这里放备案名
			)}>
				<div className="items-center grid-flow-col gap-4">
					<Image src={'/logo-transparent.png'} alt={'logo'} width={64} height={64}/>
					<p>{u.website.platformName} <br/>Since 2023</p>
				</div>
				
				{/* wechat icon (hidden in mobile )*/}
					<div className="grid grid-flow-col gap-4">
						
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className={'hidden md:block'}>
									<IconBrandWechat size={32}/>
								</TooltipTrigger>
								
								<TooltipContent>
									<ContactView/>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					
					</div>
			</footer>
		</>
	)
}
