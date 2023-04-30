/**
 * ref:
 * - prepareBot: https://github.com/wechaty/puppet-padlocal/wiki/API-%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3-(TypeScript-JavaScript)#%E5%90%AF%E5%8A%A8%E5%B9%B6%E7%99%BB%E5%BD%95bot
 */
import { ScanStatus, WechatyBuilder } from 'wechaty'
import { PuppetType } from '@/pages/api/wechaty/ds'
import { handleMessage } from '@/pages/api/wechaty/depends/handleMessage'
import { IBridge } from '@/ds/general'
import { promises } from 'fs'
import { log } from '@/lib/log'

/****************************************
 * 去掉注释，可以完全打开调试日志
 ****************************************/
// log.level("silly");


export const CACHE_DIR = 'cache'


export const initBot = async (wxid: string, puppetType: PuppetType): Promise<IBridge> => new Promise(async (resolve, reject) => {
	
	const userDir = `${CACHE_DIR}/${wxid}`
	const memoryPath = `${userDir}/${wxid}`
	await promises.mkdir(userDir, { recursive: true })
	log.info(`init bot(wxid=${wxid})`)
	
	const bot = WechatyBuilder.build({
		name: memoryPath,
		puppet: puppetType,
		// memory: new MemoryCard({ name: memoryPath }),
	})
		.on('scan', (qrcode, status) => {
				if (status === ScanStatus.Waiting && qrcode) {
					// 这是 wechaty 自己搞的qrcode 生成
					// const qrcodeImageUrl = `https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`
					// 出口2： 扫码登录
					return resolve({ success: true, content: qrcode })
				} else {
					log.info(`onScan: ${ScanStatus[status]}(${status})`)
				}
			},
		)
		.on('login', async (user) => {
			log.debug(`${user} login`)
			// 出口3： 缓存登录
			await promises.writeFile(`${userDir}/${wxid}.rooms.json`, JSON.stringify((await bot.Room.findAll()).map((item) => item.payload), null, 2))
			await promises.writeFile(`${userDir}/${wxid}.members.json`, JSON.stringify((await bot.Contact.findAll()).map((item) => item.payload), null, 2))
			
			return resolve({ success: false, content: 'existed' })
		})
		
		.on('logout', (user, reason) => {
			log.info(`${user} logout, reason: ${reason}`)
		})
		
		.on('message', async (message) => {
			log.debug(`on message: ${message.toString()}`)
			
			await handleMessage(message, bot)
			
			// await getMessagePayload(message, pupetType)
			//
			// await dingDongBot(message)
		})
		
		.on('room-invite', async (roomInvitation) => {
			log.info(`on room-invite: ${roomInvitation}`)
		})
		
		.on('room-join', (room, inviteeList, inviter, date) => {
			log.info(`on room-join, room:${room}, inviteeList:${inviteeList}, inviter:${inviter}, date:${date}`)
		})
		
		.on('room-leave', (room, leaverList, remover, date) => {
			log.info(`on room-leave, room:${room}, leaverList:${leaverList}, remover:${remover}, date:${date}`)
		})
		
		.on('room-topic', (room, newTopic, oldTopic, changer, date) => {
			log.info(`on room-topic, room:${room}, newTopic:${newTopic}, oldTopic:${oldTopic}, changer:${changer}, date:${date}`)
		})
		
		.on('friendship', (friendship) => {
			log.info(`on friendship: ${friendship}`)
		})
		
		.on('error', (error) => {
			log.info(`on error: ${error}`)
			return reject(false)
		})
	
	log.info('=== bot is starting')
	await bot.start()
})

