import { IProjectItem } from '@/i18n/schema'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import Image from 'next/image'
import Link from 'next/link'

export const ProjectView = (
	{
		name,
		desc,
		href,
		cover,
		tags = [],
	}: IProjectItem) => {
	
	return (
		<div className="card w-full bg-base-100 shadow-xl w-full md:w-[540px] h-fit md:h-[420px]">
			<AspectRatio ratio={16 / 9}>
				<Image fill className="rounded-md object-cover" src={cover} alt={cover}/>
			</AspectRatio>
			
			<div className="card-body shrink-0">
				<div className="card-title inline-flex items-center gap-2 justify-between">
					<h2>{name}</h2>
					
					<div className={'inline-flex items-center gap-2'}>
						{tags.map((tag) => (
							<div key={tag} className="badge badge-secondary shrink-0">{tag}</div>
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
