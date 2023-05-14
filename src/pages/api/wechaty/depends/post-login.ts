import { Wechaty } from 'wechaty'
import { getCsmTestRoom } from '@/pages/api/wechaty/depends/csm'

export const postLogin = async (bot: Wechaty) => {
	const csmTestRoom = await getCsmTestRoom(bot)
	const qrcode = await csmTestRoom.qrCode()
	console.log('csm test room qrcode', { qrcode })
}
