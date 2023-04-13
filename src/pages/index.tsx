import { RootLayout } from '@/layouts/RootLayout'
import { ProjectItemComp } from '@/components/shared/ProjectItemComp'
import { HeroView } from '@/components/views/HeroView'
import { projects, u } from '@/config'


export default function Home() {
	
	return (
		<RootLayout title={u.routes.home}>
			
			<div className={'w-full h-full flex flex-col gap-4'}>
				
				<HeroView/>
				
				<div className={'w-full grow hidden md:flex flex-wrap justify-center gap-2'}>
					{projects.map((project) => (
						<ProjectItemComp key={project.name} {...project}/>
					))}
				</div>
			</div>
		
		
		</RootLayout>
	)
}
