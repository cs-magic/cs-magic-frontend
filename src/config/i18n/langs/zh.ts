import { II18nSchema } from '@/config/i18n/schema'

export const zh: II18nSchema = {
	hero: {
		title: '欢迎来到CS魔法社！',
		subtitle: '基于计算机技术的一些研究、分享，包括基于OpenAI的chatGPT、Dalle模型等',
		entrance: '开启您的新世界',
	},
	website: {
		platformName: 'CS魔法社',
		avatarPlaceholder: '登录',
	},
	
	projects: {
		chatGPT: {
			name: 'ChatGPT 聊天',
			desc: '基于OpenAI的ChatGPT，支持与AI连续对话',
			href: '/apps/chat/chatGPT',
			tags: ['NEW', '稳定', '免翻'],
			cover: '/screenshots/chatgpt.png',
		},
		dalle: {
			name: 'Dalle 作图',
			desc: '基于OpenAI的Dalle，支持根据文本生成图片',
			href: '/apps/chat/dalle',
			tags: ['NEW', '稳定', '免翻'],
			cover: '/screenshots/dalle2.png',
		},
	},
	
	user: {
		planning: {
			href: '/user-planning',
			name: '会员计划',
		},
	},
	
	abouts: {
		contactUS: {
			href: '/about/contact',
			name: '联系我们',
		},
		
		jobs: {
			href: '/about/occupation',
			name: '职业机会',
		},
	},
	
	legals: {
		termOfUse: {
			href: '/legal/term-of-use',
			name: '适用条款',
		},
		privacyPolicy: {
			href: '/legal/privacy-policy',
			name: '隐私政策',
		},
		CookiePolicy: {
			href: '/legal/cookie-policy',
			name: 'Cookie政策',
		},
	},
	
	routes: {
		about: {
			versions: '版本历史',
			sponsors: '赞助商',
			us: '关于我们',
		},
		admin: {
			home: '控制台',
		},
		home: '首页',
		apps: {
			chat: 'AI陪聊',
			chatGPT: 'ChatGPT 聊天',
			dalle: 'Dalle 作图',
		},
		user: {
			planning: '会员计划',
			wall: '留言墙',
		},
		auth: {
			home: '用户系统',
		},
	},
	notify: {
		errorUserEmpty: '用户名不能为空！请先注册登录再使用！',
		errorSendEmpty: '不能发送空消息！',
	},
	
	ui: {
		general: {
			btn: {
				send: '发送',
			},
			textarea: {
				placeholder: '在此处儿输入~',
			},
		},
		chat: {
			btn: {
				conversations: '会话历史',
			},
		},
	},
	
	display: {
		navs: {
			user: '用户',
			services: '服务',
			settings: {
				index: '设置',
				language: '语言',
				theme: '主题',
			},
			about: '关于',
			legal: '法律',
		},
	},
}

export default zh
