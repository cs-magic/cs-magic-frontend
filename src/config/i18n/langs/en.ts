import { II18nSchema } from '@/config/i18n/schema'

export const en: II18nSchema = {
	hero: {
		title: 'Welcome to CS Magic Community!',
		subtitle: 'A community of Gen Z dedicated to developing friendly, robust, practical, and open-source computer programs that benefit friends around us.',
		entrance: 'Open up your new world!',
	},
	website: {
		platformName: 'CS Magic Community',
		avatarPlaceholder: 'Sign In',
	},
	projects: {
		chatGPT: {
			name: 'ChatGPT Response Generator',
			desc: '基于OpenAI的ChatGPT，支持与AI连续对话',
			href: '/apps/chat/chatGPT',
			tags: ['NEW', 'Stable', 'Mirror'],
			cover: '/screenshots/chatgpt.png',
		},
		dalle: {
			name: 'Dalle Image Generator',
			desc: '基于OpenAI的Dalle，支持根据文本生成图片',
			href: '/apps/chat/dalle',
			tags: ['NEW', 'Stable', 'Mirror'],
			cover: '/screenshots/dalle2.png',
		},
	},
	
	abouts: {
		aboutUS: {
			href: '/about/us',
			name: 'About US',
		},
		userPlanning: {
			href: '/user-planning',
			name: 'Premium Planning'
		},
		// contact: {
		// 	href: '/about/contact',
		// 	name: '联系我们',
		// },
		jobs: {
			href: '/about/occupation',
			name: 'Occupations',
		},
	},
	
	legals: {
		termOfUse: {
			href: '/legal/term-of-use',
			name: 'Term Of Use',
		},
		privacyPolicy: {
			href: '/legal/privacy-policy',
			name: 'Privacy Policy',
		},
		CookiePolicy: {
			href: '/legal/cookie-policy',
			name: 'Cookie Policy',
		},
	},
	
	routes: {
		about: {
			versions: 'Version History',
			sponsors: 'Sponsor',
			us: 'About Us',
		},
		admin: {
			home: 'Console',
		},
		home: 'Home',
		apps: {
			chat: 'AI Chat',
			chatGPT: 'ChatGPT Response Generator',
			dalle: 'Dalle Image Generator',
		},
		user: {
			planning: 'Membership Plan',
			wall: 'Messages Wall',
		},
		auth: {
			home: 'User System',
		},
	},
	notify: {
		errorUserEmpty: 'Username cannot be empty! Please register and log in before using!',
		errorSendEmpty: 'Cannot send empty message!',
	},
	
	ui: {
		general: {
			btn: {
				send: 'Send',
			},
			textarea: {
				placeholder: 'Type your message here.',
			},
		},
		chat: {
			btn: {
				conversations: 'Conversations',
			},
		},
	},
	
	display: {
		navs: {
			services: 'Services',
			settings: {
				index: 'Settings',
				language: 'Language',
				theme: 'Theme',
			},
			about: 'About',
			legal: 'Legal',
		},
	},
}

export default en
