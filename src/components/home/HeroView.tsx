import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import Image from 'next/image'

export const HeroView = () => {
	const u = useAppSelector(selectU)
	
	return (
		<AspectRatio ratio={16 / 5} className={'relative'}>
			<Image src={'/hero.jpg'} alt={'hero'} fill sizes={'50vw'} style={{ objectFit: 'fill' }} className={'brightness-50'}/>
			
			<div className="w-full h-full absolute left-0 top-0 flex flex-col justify-center items-center gap-4">
				<h1 className="text-3xl font-extrabold gradient-hero">{u.hero.title}</h1>
				<p className="text-slate-300">{u.hero.subtitle}</p>
			</div>
		</AspectRatio>
		
		
		// <div className="hero w-full h-[320px] md:[h-480px]" style={{
		// 	// source: https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg
		// 	backgroundImage: `url("/hero.jpg")`,
		// }}>
		// 	<div className="hero-overlay bg-opacity-60"></div>
		// 	<div className="hero-content text-center text-neutral-content">
		// 		<div className="max-w-md">
		// 			<h1 className="mb-5 text-3xl font-bold">{u.hero.title}</h1>
		// 			<p className="mb-5">{u.hero.subtitle}</p>
		//
		// 			{/*<Link href={projects[0].targetUrl}>*/}
		// 			{/*	<button className="btn btn-primary">{i18nSchema.hero.entrance}</button>*/}
		// 			{/*</Link>*/}
		// 		</div>
		// 	</div>
		// </div>
	)
}
