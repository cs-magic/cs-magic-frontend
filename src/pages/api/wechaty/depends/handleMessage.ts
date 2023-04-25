import { MessageInterface } from 'wechaty/dist/esm/src/user-modules/message'
import { Wechaty } from 'wechaty'

export const handleMessage = async (message: MessageInterface, bot: Wechaty) => {
	
	const room = message.room()
	const sender = message.talker() // deprecated: `.from()`
	
	// const owner = await room.owner() // 4u 没有 admin, owner 信息
	// const mentions = await message.mentionList() // message.mention()  和 mentions 是一样的
	const mentionSelf = await message.mentionSelf() // message.mention()  和 mentions 是一样的
	const text = await message.mentionText() // 这个会自动去除mentions的人，剩余纯文本
	
	if (mentionSelf
		|| /\s*ding/.test(text.toLowerCase())
	) {
		const CSM_room_marketing = await bot.Room.find({ topic: /CS魔法社.*运营/ })
		const CSM_admin_marketing_susan = await bot.Contact.find({ name: /susan/ })
		const CSM_admin_marketing_clotho = await bot.Contact.find({ name: /clotho/ })
		const CSM_admin_marketing_yyq = await bot.Contact.find({ name: /🌌/ })
		console.log({ CSM_room_marketing, CSM_admin_marketing_susan, CSM_admin_marketing_clotho, CSM_admin_marketing_yyq })
		
		// todo: 支持在 template string 中插入 mentions （目前测试，只支持一个个插，否则会转成 <Contact>）
		const response = `${(sender.name())} 你好~`
		
		if (room) await room.say(response, sender)
		else await message.say(response) // padlocal才支持reply，普通的就是普通回复
	}
	
}
