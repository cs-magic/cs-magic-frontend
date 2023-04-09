import Image from 'next/image'
import Link from 'next/link'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'

export interface IProjectItem {
	name: string
	desc: string
	coverUrl: string
	targetUrl: string
	features?: string[]
}


export const ProjectItemComp = (
	{
		name,
		desc,
		coverUrl,
		targetUrl,
		features = [],
	}: IProjectItem) => {
	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<AspectRatio ratio={16 / 9}>
				<Image fill className="rounded-md object-cover" src={coverUrl} alt={name}/>
			</AspectRatio>
			
			<div className="card-body">
				<h2 className="card-title">
					{name}
					
					{features.map((feature) => (
						<div key={feature} className="badge badge-secondary">{feature}</div>
					))}
				</h2>
				<p>{desc}</p>
				<div className="card-actions justify-end">
					<Link href={targetUrl} className="badge badge-lg badge-accent">Try</Link>
				</div>
			</div>
		</div>
	)
}
