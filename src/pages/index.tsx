import { RootLayout } from '@/components/layouts/RootLayout'
import { HeroView } from '@/components/HeroView'
import { useAppSelector } from '@/hooks/use-redux'
import { selectU } from '@/states/features/i18nSlice'
import { ProjectView } from '@/components/ProjectView'


export default function Home() {
	const u = useAppSelector(selectU)
	
	return (
		<RootLayout title={u.routes.home}>
			
			<div className={'w-full flex flex-col gap-4'}>
				
				<HeroView/>
				
				<div className={'py-2 w-full grow flex flex-wrap justify-around gap-4'}>
					{Object.values(u.projects).map((project) => (
						<ProjectView key={project.name} {...project}/>
					))}
				</div>
			</div>
		
		
		</RootLayout>
	)
}
