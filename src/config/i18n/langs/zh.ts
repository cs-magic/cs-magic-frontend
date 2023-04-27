import { II18nSchema } from '@/config/i18n/schema'

export const zh: II18nSchema = {
	routers: {
		home: '主页',
		admin: {
			console: '控制台',
			wechat: '微信机器人',
		},
		auth: {
			signin: '登录系统',
		},
		user: {
			planning: '会员计划',
			wallMessages: '留言墙',
		},
		about: {
			contactUS: '联系我们',
			jobs: '加入我们',
			versions: '版本历史',
		},
		legals: {
			termOfUse: '条款说明',
			privacyPolicy: '隐私政策',
		},
		apps: {
			chat: {
				chatGPT: 'ChatGPT聊天',
				dalle: 'Dalle生图',
			},
		},
	},
	
	apps: {
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
			themes: '主题',
			languages: '语言',
			wallMessages: '留言墙',
		},
		hero: {
			title: '欢迎来到CS魔法社！',
			subtitle: '基于计算机技术的一些研究、分享，包括基于OpenAI的chatGPT、Dalle模型等',
			entrance: '开启您的新世界',
		},
		website: {
			platformName: 'CS魔法社',
			avatarPlaceholder: '登录',
		},
	},
}

export default zh
