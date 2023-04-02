import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { RootLayout } from '@/components/layouts/RootLayout'
import { CompProjectItem, IProjectItem } from '@/components/shared/CompProjectItem'
import { SpecHero } from '@/components/specs/SpecHero'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const projects: IProjectItem[] = [
		{
			name: 'ChatGPT',
			desc: '镜像ChatGPT',
			coverUrl: '/screenshots/chatgpt.png',
			features: ['NEW', '稳定', '免翻'],
			targetUrl: '/chat',
		},
	]
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
