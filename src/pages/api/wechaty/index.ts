import { NextApiRequest, NextApiResponse } from 'next'
import { initBot } from '@/pages/api/wechaty/depends/bot'
import { PuppetType } from '@/pages/api/wechaty/ds'
import { IBridge } from '@/ds/general'

export default async function handler(req: NextApiRequest, res: NextApiResponse<IBridge>) {
	const wxid = req.query.wxid as string | undefined
	if (!wxid) return res.send({ success: false, content: 'no wxid' })
	const content = await initBot(wxid, PuppetType.wechat4u)
	return res.send(content)
}
