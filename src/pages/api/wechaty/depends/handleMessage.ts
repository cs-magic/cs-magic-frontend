import { MessageInterface } from 'wechaty/dist/esm/src/user-modules/message'
import { Wechaty } from 'wechaty'
import backendApi from '@/lib/api'
import { log } from '@/lib/log'
import { ChatgptRoleType, IChatgptMessage } from '@/ds/openai/chatgpt'
import { PlatformType } from '@/ds/openai'
import { MessageType } from '@/ds/general'


export const handleMessage = async (message: MessageInterface, bot?: Wechaty) => {
	
	const room = message.room()
	const sender = message.talker() // deprecated: `.from()`
	
	// const owner = await room.owner() // 4u 没有 admin, owner 信息
	// const mentions = await message.mentionList() // message.mention()  和 mentions 是一样的
	const mentionSelf = await message.mentionSelf() // message.mention()  和 mentions 是一样的
	const text = await message.mentionText() // 这个会自动去除mentions的人，剩余纯文本
	
	const [_, tag_ = '', content = ''] = text.match(/\s*(#\S+)?\s*(.*)/) || []
	// todo: 用param，（网址里不能用 #）
	const tag = tag_.replace(/#/g, '')
	const target = room ? room : await message.listener()!
	
	// 测试专用！
	if (/ding/.test(text.toLowerCase())) {
		await message.say('dong!')
	}
	
	// 私人聊天
	if (!room) {
		// todo: tag文档系统对接书记酱！
		// await message.say('received!')
		return
	}
	
	// 群聊 没有at自己
	if (!mentionSelf) {
		// 不要说话
		return
	}
	
	// 群聊 at自己
	const { data: conversation_id } = await backendApi.post('/conversation/wechat', {
		user_id: sender.id,
		user_name: sender.name(),
		target_id: target.id,
		tag,
	})
	log.info('generated conversation: ', { conversation_id, text, tag, content })
	
	const msg: IChatgptMessage = {
		content,
		conversation_id,
		sender: sender.id,
		platform_params: { role: ChatgptRoleType.user },
		type: MessageType.text,
		status: 'OK',
		time: new Date(),
		platform_type: PlatformType.chatGPT,
	}
	
	let response
	try {
		const { data } = await backendApi.post(`/chatGPT/${conversation_id}/chat`, msg, { params: { stream: false } })
		response = data
	} catch (e) {
		log.error(e.response.data)
		response = e.response.data.detail
	}
	
	try {
		await room.say(response, sender)
	} catch (e) {
		log.info('sending message error:', e)
	}
}
