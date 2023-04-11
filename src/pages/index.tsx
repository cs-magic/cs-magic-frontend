import { RootLayout } from '@/layouts/RootLayout'
import { ProjectItemComp } from '@/components/shared/ProjectItemComp'
import { HeroView } from '@/components/views/HeroView'
import { projects } from '@/config'


export default function Home() {
	
	return (
		<RootLayout>
			
			<div className={'w-full h-full flex flex-col gap-4'}>
				
				<HeroView/>
				
				<div className={'hidden md:flex w-full flex-wrap justify-center gap-2'}>
					{projects.map((project) => (
						<ProjectItemComp key={project.name} {...project}/>
					))}
				</div>
			</div>
		
		
		</RootLayout>
	)
}
