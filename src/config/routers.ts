import { AUTH_WAY, AuthWay } from '@/config/settings'

export const routers = {
	apps: {
		chat: {
			chatGPT: '/apps/chat/chatGPT',
			dalle: '/apps/chat/dalle',
		},
	},
	
	user: {
		planning: '/user-planning',
		wallMessages: '/wall-messages',
	},
	
	about: {
		versions: '/about/versions',
		contactUS: '/about/contact',
		jobs: '/about/occupation',
	},
	
	legals: {
		termOfUse: '/legal/term-of-use',
		privacyPolicy: '/legal/privacy-policy',
	},
	
	admin: {
		console: '/admin',
		wechat: '/wechat?wxid=${wxid}', // todo: template
	},
	home: '/',
	auth: {
		signin: AUTH_WAY === AuthWay.byBackend ? '/auth/signinViaBackend' : '/auth/signinViaNextAuth',
	},
}


export type IRouters = typeof routers
