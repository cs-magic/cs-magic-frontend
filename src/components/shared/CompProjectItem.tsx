import Image from 'next/image'
import Link from 'next/link'

export interface IProjectItem {
	name: string
	desc: string
	coverUrl: string
	targetUrl: string
	features?: string[]
}


export const CompProjectItem = (
	{
		name,
		desc,
		coverUrl,
		targetUrl,
		features = [],
	}: IProjectItem) => {
	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			
			<figure>
				<Image src={coverUrl} alt={name} width={320} height={240}/>
			</figure>
			
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
