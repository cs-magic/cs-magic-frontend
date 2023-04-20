import { CentralLayout } from '@/layouts/CentralLayout'
import Image from 'next/image'

export const AboutUsPage = () => {
	return (
		<CentralLayout>
			<Image src={'/qrcodes/wechat-mark.jpeg'} alt={'wechat-mark.jpeg'} width={320} height={480}/>
		</CentralLayout>
	)
}

export default AboutUsPage
