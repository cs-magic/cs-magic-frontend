import { NextApiRequest, NextApiResponse } from 'next'
import { getTokenCenter } from '@/pages/api/auth/general'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const email = req.query.email as string
	const token = getTokenCenter(email)
	res.status(200).send(token)
}

