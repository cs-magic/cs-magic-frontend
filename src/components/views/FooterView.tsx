import { IconBrandWechat } from '@tabler/icons-react'
import Image from 'next/image'
import { Tooltip, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { TooltipContent } from '@/components/ui/tooltip'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { selectLang, selectU, setLang } from '@/states/features/i18nSlice'
import { themes } from '@/config/general'
import { useTheme } from 'next-themes'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Switch } from '../ui/switch'


export const FooterView = () => {
	const dispatch = useAppDispatch()
	const lang = useAppSelector(selectLang)
	const u = useAppSelector(selectU)
	
	const { theme, setTheme } = useTheme()
	
	return (
		<>
			<footer className="footer p-10 bg-base-200 text-base-content">
				
				<div>
					<span className="footer-title">{u.display.navs.services}</span>
					{Object.values(u.projects).map((item) => (
						<Link href={item.href} key={item.name}>{item.name}</Link>
					))}
				</div>
				
				
				<div>
					<span className="footer-title">{u.display.navs.settings.index}</span>
					
					<div className="flex items-center gap-4">
						<Label className={'shrink-0'} htmlFor="language">{u.display.navs.settings.language}</Label>
						<Switch onCheckedChange={() => dispatch(setLang(lang === 'zh' ? 'en' : 'zh'))}/>
					</div>
					
					<div className="flex items-center gap-4">
						<Label className={'shrink-0'} htmlFor="theme">{u.display.navs.settings.theme}</Label>
						<Select onValueChange={setTheme}>
							<SelectTrigger id={'theme'}>
								<SelectValue placeholder={theme}/>
							</SelectTrigger>
							
							<SelectContent className={'bg-base-300'}>
								<SelectGroup>
									{themes.map((theme) => (
										<SelectItem value={theme} key={theme}>{theme}</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					
					
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
			
			<footer className="md:hidden footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
				<div className="items-center grid-flow-col gap-4">
					<Image src={'/logo-transparent.png'} alt={'logo'} width={64} height={64}/>
					<p>{u.website.platformName} <br/>Since 2023</p>
				</div>
				<div className="md:place-self-center md:justify-self-end">
					<div className="grid grid-flow-col gap-4">
						
						{/*/!* twitter icon *!/*/}
						{/*<a>*/}
						{/*	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">*/}
						{/*		<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>*/}
						{/*	</svg>*/}
						{/*</a>*/}
						
						{/*/!* youtube icon *!/*/}
						{/*<a>*/}
						{/*	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">*/}
						{/*		<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>*/}
						{/*	</svg>*/}
						{/*</a>*/}
						
						{/*/!* facebook icon *!/*/}
						{/*<a>*/}
						{/*	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">*/}
						{/*		<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>*/}
						{/*	</svg>*/}
						{/*</a>*/}
						
						
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className={'hidden md:block'}><IconBrandWechat size={32}/></TooltipTrigger>
								
								<TooltipContent>
									<Image src={'/qrcodes/wechat-mark.jpeg'} alt={'wechat-mark.jpeg'} width={320} height={480}/>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					
					
					</div>
				</div>
			</footer>
		</>
	)
}
