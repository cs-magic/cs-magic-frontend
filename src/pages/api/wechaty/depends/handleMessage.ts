import { MessageInterface } from 'wechaty/dist/esm/src/user-modules/message'

export const handleMessage = async (message?: MessageInterface) => {
	if (!message)
		return
	
	const payload = message.payload
	
	if (!payload) return
	
	console.log({ payload })
	
	const text = payload.text
	
	
	const room = await message.room()
	
	if (!room) {
		return
	}
	
	const owner = await room.owner()
	console.log({ owner })
	
	if (text && text.includes('test')) {
		const members = await room.memberAll()
		console.log('members', members)
		for (const member of members) {
		
		}
	}
}
