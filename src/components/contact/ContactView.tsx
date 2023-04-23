import Image from 'next/image'
import { Label } from '../ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

export const ContactView = () => {
	return (
		// <div className={'flex flex-col gap-2'}>
		// 	<Label>联系小助手</Label>
		// 	<Image src={'/qrcodes/wechat-clotho.png'} alt={'contact'} width={320} height={480}/>
		// </div>
		//
		<Tabs defaultValue="test" className="w-[400px]">
			<TabsList>
				<TabsTrigger value="cmo">联系小助手</TabsTrigger>
				<TabsTrigger value="test">加入内测群</TabsTrigger>
				<TabsTrigger value="ceo">申请合作</TabsTrigger>
			</TabsList>
			
			
			<TabsContent value="test">
				<Image src={'/qrcodes/group-0.3.jpeg'} alt={'test'} width={320} height={480}/>
			</TabsContent>
			
			<TabsContent value="cmo">
				<Image src={'/qrcodes/wechat-clotho.png'} alt={'CMO'} width={320} height={480}/>
			</TabsContent>
			
			<TabsContent value="ceo">
				<Image src={'/qrcodes/wechat-mark.jpeg'} alt={'CEO'} width={320} height={480}/>
			</TabsContent>
		
		
		</Tabs>
	
	)
}
