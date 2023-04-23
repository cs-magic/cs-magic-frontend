export const routers = {
	apps: {
		chat: {
			chatGPT: '/apps/chat/chatGPT',
			dalle: '/apps/chat/dalle',
		},
	},
	
	user: {
		planning: '/user-planning',
		wallMessages: '/user-wallMessages',
	},
	
	abouts: {
		versions: '/about/versions',
		contactUS: '/about/contact',
		jobs: '/about/occupation',
	},
	
	legals: {
		termOfUse: '/legal/term-of-use',
		privacyPolicy: '/legal/privacy-policy',
		CookiePolicy: '/legal/cookie-policy',
	},
	
	admin: {
		home: '/admin',
	},
	home: '/',
}


export type IRouters = typeof routers
