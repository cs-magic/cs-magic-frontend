import Link from 'next/link'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import { HTMLAttributes } from 'react'
import LogoComp from '@/components/general/LogoComp'
import { clsx } from 'clsx'


export const LogoHomeView = ({ className, ...props }: HTMLAttributes<HTMLAnchorElement>) => {
	const u = useAppSelector(selectU)
	
	return (
		<Link href={'/'} className={clsx('cursor-pointer', 'flex justify-start items-center gap-2 text-primary', className)} {...props}>
			{/* website logo */}
			<LogoComp className={'w-8 h-8'}/>
			
			{/* website name */}
			<span className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">{u.website.platformName}</span>
		
		</Link>
	)
}
