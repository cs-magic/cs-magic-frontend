import { schemaCN } from '@/i18n/langs/cn'
import Link from 'next/link'
import { projects } from '@/config'

export const HeroView = () => {
	const i18nSchema = schemaCN
	
	return (
		<div className="hero h-[320px]" style={{ backgroundImage: `url("https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg")` }}>
			<div className="hero-overlay bg-opacity-60"></div>
			<div className="hero-content text-center text-neutral-content">
				<div className="max-w-md">
					<h1 className="mb-5 text-5xl font-bold">{i18nSchema.hero.title}</h1>
					<p className="mb-5">{i18nSchema.hero.subtitle}</p>
					
					<Link href={projects[0].targetUrl}>
						<button className="btn btn-primary">{i18nSchema.hero.entrance}</button>
					</Link>
				</div>
			</div>
		</div>
	)
}
