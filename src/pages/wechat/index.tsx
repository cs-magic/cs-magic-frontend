import { useRouter } from 'next/router'
import { useGetWechatQrcodeQuery } from '@/api/backApi'
import { CentralLayout } from '@/components/layouts/CentralLayout'
import { CentralLoadingComp } from '@/components/general/CentralLoadingComp'
import { QRCodeCanvas } from 'qrcode.react'
import { Label } from '@/components/ui/label'

export const WechatPage = () => {
	const router = useRouter()
	
	const { data } = useGetWechatQrcodeQuery(router.query.wxid as string | undefined)
	
	return (
		<CentralLayout>
			{
				!data ? <CentralLoadingComp/>
					: !data.success ? <p className={'bg-red-500 text-white'}>{data.content}</p>
						: <div className={'flex flex-col gap-2 items-center'}>
							<Label className={'text-xl'}>CS魔法社管理员登录</Label>
							<QRCodeCanvas value={data.content} size={256} includeMargin/>
						</div>
			}
		</CentralLayout>
	)
}


export default WechatPage
