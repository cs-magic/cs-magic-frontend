import { MessageInterface } from 'wechaty/dist/esm/src/user-modules/message'

export const handleMessage = async (message?: MessageInterface) => {
	if (!message)
		return
	
	const payload = message.payload
	
	if (!payload) return
	
	console.log({ payload })
	
	
	const room = await message.room()
	
	if (!room) {
		return
	}
	
	const members = await room.memberAll()
	console.log('members', members)
}
