import { IProjectItem } from '@/config/i18n/schema'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '../ui/badge'

export const ProjectView = (
	{
		name,
		desc,
		href,
		cover,
		tags = [],
	}: IProjectItem) => {
	
	return (
		<Link href={href}>
			<Card className="card w-full md:w-[540px]">
				
				<CardHeader>
					<CardTitle className={'inline-flex items-center justify-between'}>
						{name}
						
						<div className={'inline-flex items-center gap-2'}>
							{tags.map((tag) => (
								<Badge key={tag}>{tag}</Badge>
							))}
						</div>
					</CardTitle>
					
					<CardDescription>{desc}</CardDescription>
				</CardHeader>
				
				<CardContent>
					<AspectRatio ratio={16 / 9}>
						<Image fill className="rounded-md object-cover" src={cover} alt={cover} sizes={'(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw'}/>
					</AspectRatio>
				</CardContent>
				
				<CardFooter className={'w-full inline-flex items-center justify-between'}>
					{/*<Link href={href}><Badge variant={'destructive'} className={'py-0'}>Try</Badge></Link>*/}
				</CardFooter>
			</Card>
		</Link>
	)
}
