import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'

export const ContactView = () => {
	return (
		// <div className={'flex flex-col gap-2'}>
		// 	<Label>联系小助手</Label>
		// 	<Image src={'/qrcodes/wechat-clotho.png'} alt={'contact'} width={320} height={480}/>
		// </div>
		//
		<Tabs defaultValue="test" className="w-[400px]">
			<TabsList className={'w-full justify-around'}>
				<TabsTrigger value="cmo">联系小助手</TabsTrigger>
				<TabsTrigger value="test">加入内测群</TabsTrigger>
				<TabsTrigger value="ceo">申请合作</TabsTrigger>
			</TabsList>
			
			
			<TabsContent value="test">
				<AspectRatio ratio={9 / 12}>
					<Image src={'/qrcodes/group-0.3.jpeg'} alt={'test'} fill style={{objectFit: 'contain'}} sizes={'320px'}/>
				</AspectRatio>
			</TabsContent>
			
			<TabsContent value="cmo">
				<AspectRatio ratio={9 / 12}>
					<Image src={'/qrcodes/wechat-clotho.png'} alt={'CMO'} fill style={{objectFit: 'contain'}} sizes={'320px'}/>
				</AspectRatio>
			</TabsContent>
			
			<TabsContent value="ceo">
				<AspectRatio ratio={9 / 12}>
					<Image src={'/qrcodes/wechat-mark.jpeg'} alt={'CEO'} fill style={{objectFit: 'contain'}} sizes={'320px'}/>
				</AspectRatio>
			</TabsContent>
		
		
		</Tabs>
	
	)
}
