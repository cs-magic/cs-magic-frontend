import { RootLayout } from '@/components/layouts/RootLayout'
import { HeroView } from '@/components/home/HeroView'
import { useU } from '@/hooks/use-u'


export default function Home() {
	const u = useU()
	
	return (
		<RootLayout title={u.routers.home}>
			
			<div className={'w-full flex flex-col gap-4'}>
				
				<HeroView/>
				
				{/*<div className={'py-2 w-full grow flex flex-wrap justify-around gap-4'}>*/}
				{/*	{Object.values(u.apps).map((project) => (*/}
				{/*		<ProjectView key={project.name} {...project}/>*/}
				{/*	))}*/}
				{/*</div>*/}
			</div>
		
		
		</RootLayout>
	)
}
