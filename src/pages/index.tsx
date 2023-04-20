import { RootLayout } from '@/layouts/RootLayout'
import { ProjectItemComp } from '@/components/shared/ProjectItemComp'
import { HeroView } from '@/components/views/HeroView'
import { projects } from '@/config'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'


export default function Home() {
	const u = useAppSelector(selectU)
	
	return (
		<RootLayout title={u.routes.home}>
			
			<div className={'w-full h-full flex flex-col gap-4'}>
				
				<HeroView/>
				
				<div className={'w-full grow flex flex-wrap justify-around gap-4'}>
					{projects.map((project) => (
						<ProjectItemComp key={project.nameKey} {...project}/>
					))}
				</div>
			</div>
		
		
		</RootLayout>
	)
}
