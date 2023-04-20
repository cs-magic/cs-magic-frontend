import Image from 'next/image'
import Link from 'next/link'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'

export interface IProjectItem {
	nameKey: string
	desc: string
	href: string
	coverUrl: string
	features?: string[]
}


export const ProjectItemComp = (
	{
		nameKey,
		desc,
		href,
		coverUrl,
		features = [],
	}: IProjectItem) => {
	const u = useAppSelector(selectU)
	
	return (
		<div className="card w-full bg-base-100 shadow-xl w-full md:w-[540px] h-fit md:h-[420px]">
			<AspectRatio ratio={16 / 9}>
				<Image fill className="rounded-md object-cover" src={coverUrl} alt={nameKey}/>
			</AspectRatio>
			
			<div className="card-body shrink-0">
				<div className="card-title inline-flex items-center gap-2 justify-between">
					{/*// @ts-ignore*/}
					<h2>{u[nameKey]}</h2>
					
					<div className={'inline-flex items-center gap-2'}>
						{features.map((feature) => (
							<div key={feature} className="badge badge-secondary shrink-0">{feature}</div>
						))}
					</div>
				</div>
				
				<div className="card-actions justify-end flex ">
					<p>{desc}</p>
					<Link href={href} className="badge badge-lg badge-accent">Try</Link>
				</div>
			</div>
		</div>
	)
}
