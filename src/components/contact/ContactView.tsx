import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'

export const ContactView = () => {
	return (
		<Tabs defaultValue="cmo" className="w-[400px]">
			
			<TabsList className={'w-full justify-around'}>
				<TabsTrigger value="test">加入内测群</TabsTrigger>
				<TabsTrigger value="cmo">联系小助手</TabsTrigger>
				<TabsTrigger value="ceo">技术咨询</TabsTrigger>
			</TabsList>
			
			
			<TabsContent value="cmo">
				<Tabs defaultValue={'east'}>
					
					<TabsList className={'w-full flex'}>
						<TabsTrigger value={'east'}>亚太<br/>（北京时间 09 - 21）</TabsTrigger>
						<TabsTrigger value={'west'}>美东<br/>（北京时间 21 - 09）</TabsTrigger>
					</TabsList>
					
					<TabsContent value={'east'}>
						<AspectRatio ratio={9 / 12}>
							<Image src={'/qrcodes/wechat-clotho.png'} alt={'CMO-EAST'} fill style={{ objectFit: 'contain' }} sizes={'320px'}/>
						</AspectRatio>
					</TabsContent>
					
					<TabsContent value={'west'}>
						<AspectRatio ratio={9 / 12}>
							<Image src={'/qrcodes/wechat-yyq.png'} alt={'CMO-WEST'} fill style={{ objectFit: 'contain' }} sizes={'320px'}/>
						</AspectRatio>
					</TabsContent>
				
				</Tabs>
			
			</TabsContent>
			
			<TabsContent value="test">
				<AspectRatio ratio={9 / 12}>
					<Image src={'/qrcodes/group-0.3.jpeg'} alt={'test'} fill style={{ objectFit: 'contain' }} sizes={'320px'}/>
				</AspectRatio>
			</TabsContent>
			
			<TabsContent value="ceo">
				<AspectRatio ratio={9 / 12}>
					<Image src={'/qrcodes/wechat-mark.jpeg'} alt={'CEO'} fill style={{ objectFit: 'contain' }} sizes={'320px'}/>
				</AspectRatio>
			</TabsContent>
		
		
		</Tabs>
	
	)
}
