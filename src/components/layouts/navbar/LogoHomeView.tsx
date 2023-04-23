import Link from 'next/link'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import { HTMLAttributes } from 'react'
import LogoSVG from '@/components/svg/LogoSVG'
import { clsx } from 'clsx'


export const LogoHomeView = ({ className, ...props }: HTMLAttributes<HTMLAnchorElement>) => {
	const u = useAppSelector(selectU)
	const website = u.display.website
	
	return (
		<Link href={'/'} className={clsx('cursor-pointer', 'flex justify-start items-center gap-2 text-purple-500', className)} {...props}>
			{/* website logo */}
			<LogoSVG className={'w-8 h-8'}/>
			
			{/* website name */}
			<span className="text-2xl font-extrabold gradient-logo">{website.platformName}</span>
		
		</Link>
	)
}
