import { II18nSchema } from '@/config/i18n/schema'

export const en: II18nSchema = {
	routers: {
		home: 'Home',
		admin: {
			console: 'Console',
			wechat: 'Wechat Bot',
		},
		auth: {
			signin: 'Singn In System',
		},
		
		user: {
			planning: 'MemberShip Planning',
			wallMessages: 'Messages Wall',
		},
		about: {
			contactUS: 'Contact US',
			jobs: 'Job Opportunities',
			versions: 'Release Versions',
		},
		legals: {
			termOfUse: 'Term Of Use',
			privacyPolicy: 'Privacy Policy',
		},
		apps: {
			chat: {
				chatGPT: 'ChatGPT',
				// dalle: 'Dalle Image',
			},
		},
	},
	
	apps: {
		chatGPT: {
			name: 'ChatGPT Response Generator',
			desc: 'Based on OpenAI\'s ChatGPT, supporting continuous conversation with AI.',
			href: '/apps/chat/chatGPT',
			tags: ['NEW', 'Stable', 'Mirror'],
			cover: '/screenshots/chatgpt.png',
		},
		// dalle: {
		// 	name: 'Dalle Image Generator',
		// 	desc: 'Based on OpenAI\'s Dalle, supporting image generation from text.',
		// 	href: '/apps/chat/dalle',
		// 	tags: ['NEW', 'Stable', 'Mirror'],
		// 	cover: '/screenshots/dalle2.png',
		// },
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
			user: 'User',
			services: 'Services',
			settings: {
				index: 'Settings',
				language: 'Language',
				theme: 'Theme',
			},
			about: 'About',
			legal: 'Legal',
			themes: 'Themes',
			languages: 'Languages',
			wallMessages: 'Messages Wall',
		},
		hero: {
			title: 'Welcome to CS Magic Community!',
			subtitle: 'A community of Gen Z dedicated to developing friendly, robust, practical, and open-source computer programs that benefit friends around us.',
			entrance: 'Open up your new world!',
		},
		website: {
			platformName: 'CS Magic Community',
			avatarPlaceholder: 'Sign In',
		},
	},
}

export default en
