import type { NextApiRequest, NextApiResponse } from 'next'
import { tokenCentre } from '@/pages/api/auth/[...nextauth]'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const id = req.query.id as string | undefined
	
	/**
	 * todo: 为什么自动转成了数字呢？
	 */
	res.send(!id ? tokenCentre : tokenCentre[id])
}
