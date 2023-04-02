import { RootLayout } from '@/components/layouts/RootLayout'
import { CompProjectItem } from '@/components/shared/CompProjectItem'
import { SpecHero } from '@/components/specs/SpecHero'
import { projects } from '@/config'


export default function Home() {
	
	return (
		<RootLayout>
			
			<div className={'flex flex-col gap-4'}>
				
				<SpecHero/>
				
				<div className={'w-full flex flex-wrap gap-2'}>
					{projects.map((project) => (
						<CompProjectItem key={project.name} {...project}/>
					))}
				</div>
			</div>
		
		
		</RootLayout>
	)
}
