import { NextApiRequest, NextApiResponse } from 'next'
import { initBot } from '@/pages/api/wechaty/bot'
import { PuppetType } from '@/pages/api/wechaty/ds'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const wxid = req.query.wxid as string | undefined
	if (!wxid) return res.status(400).send('query of wxid is necessary!')
	const content = await initBot(wxid, PuppetType.wechat4u)
	if (typeof content === 'string') res.redirect(content)
	else res.status(200).send(content)
}
