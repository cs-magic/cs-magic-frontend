import { Room, Wechaty } from 'wechaty'

export const csmAdmin = async (bot: Wechaty) => {
	const CSM_room_marketing = await bot.Room.find({ topic: /CS魔法社.*运营/ })
	const CSM_admin_marketing_susan = await bot.Contact.find({ name: /susan/ })
	const CSM_admin_marketing_clotho = await bot.Contact.find({ name: /clotho/ })
	const CSM_admin_marketing_yyq = await bot.Contact.find({ name: /🌌/ })
	console.log({ CSM_room_marketing, CSM_admin_marketing_susan, CSM_admin_marketing_clotho, CSM_admin_marketing_yyq })
	
}

export const getCsmTestRoom = async (bot: Wechaty): Promise<Room> =>
	(await bot.Room.find({ topic: /CS魔法社.*内测/ }))!
