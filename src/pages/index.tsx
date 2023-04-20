import { RootLayout } from '@/layouts/RootLayout'
import { HeroView } from '@/components/views/HeroView'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import { ProjectView } from '@/components/views/ProjectView'


export default function Home() {
	const u = useAppSelector(selectU)
	
	return (
		<RootLayout title={u.routes.home}>
			
			<div className={'w-full h-full flex flex-col gap-4'}>
				
				<HeroView/>
				
				<div className={'w-full grow flex flex-wrap justify-around gap-4'}>
					{Object.values(u.projects).map((project) => (
						<ProjectView key={project.name} {...project}/>
					))}
				</div>
			</div>
		
		
		</RootLayout>
	)
}
