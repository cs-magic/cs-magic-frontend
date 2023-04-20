import Link from 'next/link'
import Image from 'next/image'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'

export const LogoHomeView = () => {
	const u = useAppSelector(selectU)
	
	return (
		<Link href={'/'} className={'inline-flex gap-2 items-center cursor-pointer'}>
			<Image src={'/logo-transparent.png'} alt={'logo'} width={36} height={36} className={'hidden md:block'}/>
			<div className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">{u.website.platformName}</div>
		</Link>
	)
}
