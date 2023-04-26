import { CentralLayout } from '@/components/layouts/CentralLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import Image from 'next/image'
import { ComponentProps } from 'react'

export const AboutUsPage = () => {
	
	const ConstraintImage = ({ src, alt = 'img', ...props }: { src: string, alt?: string } & ComponentProps<typeof Image>) => (
		<AspectRatio ratio={9 / 12}>
			<Image src={src} alt={alt} fill style={{ objectFit: 'contain' }} sizes={'320px'} {...props}/>
		</AspectRatio>
	)
	
	return (
		<CentralLayout>
			
			<Tabs defaultValue="test" className="w-[400px]">
				
				<TabsList className={'w-full justify-around'}>
					<TabsTrigger value="test">加入内测群</TabsTrigger>
					<TabsTrigger value="marketing">联系小助手</TabsTrigger>
					<TabsTrigger value="commercial">商务咨询</TabsTrigger>
					<TabsTrigger value="technology">技术咨询</TabsTrigger>
				</TabsList>
				
				<TabsContent value="test">
					<ConstraintImage src={'/qrcodes/wechat-test-group-0.3.jpeg'} alt={'test'} priority/>
				</TabsContent>
				
				<TabsContent value="marketing">
					<Tabs defaultValue={'east'}>
						
						<TabsList className={'w-full flex'}>
							<TabsTrigger value={'east'}>亚太<br/>（北京时间 09 - 21）</TabsTrigger>
							<TabsTrigger value={'west'}>美东<br/>（北京时间 21 - 09）</TabsTrigger>
						</TabsList>
						
						<TabsContent value={'east'}>
							<ConstraintImage src={'/qrcodes/wechat-clotho.png'} alt={'east marketing'}/>
						</TabsContent>
						
						<TabsContent value={'west'}>
							<ConstraintImage src={'/qrcodes/wechat-yyq.png'} alt={'west marketing'}/>
						</TabsContent>
					
					</Tabs>
				
				</TabsContent>
				
				<TabsContent value="commercial">
					<ConstraintImage src={'/qrcodes/wechat-susan-2.png'} alt={'commercial'}/>
				</TabsContent>
				
				<TabsContent value="technology">
					<ConstraintImage src={'/qrcodes/wechat-mark.jpeg'} alt={'technology'}/>
				</TabsContent>
			
			</Tabs>
		
		</CentralLayout>
	)
}

export default AboutUsPage
