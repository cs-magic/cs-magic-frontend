import Link from 'next/link'
import { HTMLAttributes } from 'react'
import LogoSVG from '@/components/svg/LogoSVG'
import { clsx } from 'clsx'
import { useU } from '@/hooks/use-u'


export const LogoHomeView = ({ className, ...props }: HTMLAttributes<HTMLAnchorElement>) => {
	const u = useU()
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
