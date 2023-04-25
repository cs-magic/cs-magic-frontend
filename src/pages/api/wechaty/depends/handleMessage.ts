import { MessageInterface } from 'wechaty/dist/esm/src/user-modules/message'
import { Wechaty } from 'wechaty'
import backendApi from '@/lib/api'
import { IMessage, MessageRoleType, MessageType } from '@/ds/openai/message'
import { PlatformType } from '@/ds/openai/general'


export const handleMessage = async (message: MessageInterface, bot: Wechaty) => {
	
	// const CSM_room_marketing = await bot.Room.find({ topic: /CS魔法社.*运营/ })
	// const CSM_admin_marketing_susan = await bot.Contact.find({ name: /susan/ })
	// const CSM_admin_marketing_clotho = await bot.Contact.find({ name: /clotho/ })
	// const CSM_admin_marketing_yyq = await bot.Contact.find({ name: /🌌/ })
	// console.log({ CSM_room_marketing, CSM_admin_marketing_susan, CSM_admin_marketing_clotho, CSM_admin_marketing_yyq })
	
	
	const room = message.room()
	const sender = message.talker() // deprecated: `.from()`
	
	// const owner = await room.owner() // 4u 没有 admin, owner 信息
	// const mentions = await message.mentionList() // message.mention()  和 mentions 是一样的
	const mentionSelf = await message.mentionSelf() // message.mention()  和 mentions 是一样的
	const text = await message.mentionText() // 这个会自动去除mentions的人，剩余纯文本
	
	const [_, tag_ = '', content = ''] = text.match(/\s*(#\S+)?\s*(.*)/) || []
	// note: 网址里不能用 #
	// todo: 用param
	const tag = tag_.replace(/#/g, '')
	const target = room ? room : await message.listener()!
	
	if (mentionSelf
		|| /\s*ding/.test(text.toLowerCase())
	) {
		
		const { data: conversation_id } = await backendApi.post('/conversation/wechat', {
			user_id: sender.id,
			user_name: sender.name(),
			target_id: target.id,
			tag,
		})
		console.log({ conversation_id, text, tag, content })
		
		const msg: IMessage<PlatformType.chatGPT> = {
			content,
			conversation_id,
			sender: sender.id,
			platform_params: {
				role: MessageRoleType.user,
			},
			type: MessageType.text,
			status: 'OK',
			time: Date.now(),
			platform_type: PlatformType.chatGPT,
		}
		
		let response
		try {
			const { data } = await backendApi.post(`/chatGPT/${conversation_id}/chat`, msg, { params: { stream: false } })
			response = data
		} catch (e) {
			console.error(e)
			response = e.data.detail
		}
		
		if (room) await room.say(response, sender)
		else await message.say(response) // padlocal才支持reply，普通的就是普通回复
	}
}
