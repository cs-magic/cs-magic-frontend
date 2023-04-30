import { II18nSchema } from '@/config/i18n/schema'

export const tc: II18nSchema = {
	routers: {
		home: '主頁',
		admin: {
			console: '控製颱',
			wechat: '微信機器人',
		},
		auth: {
			signin: '登錄繫統',
		},
		user: {
			planning: '會員計劃',
			wallMessages: '留言牆',
		},
		about: {
			contactUS: '聯繫我們',
			jobs: '加入我們',
			versions: '版本曆史',
		},
		legals: {
			termOfUse: '隱私政策',
			privacyPolicy: '隱私政策',
		},
		apps: {
			chat: {
				chatGPT: 'ChatGPT聊天',
				dalle: 'Dalle生圖',
			},
		},
	},
	
	apps: {
		chatGPT: {
			name: 'ChatGPT 聊天',
			desc: '基於OpenAI的ChatGPT，支持與AI連續對話,
			href: '/apps/chat/chatGPT',
			tags: ['NEW', '穩定', '免翻'],
			cover: '/screenshots/chatgpt.png',
		},
		dalle: {
			name: 'Dalle 作圖',
			desc: '基於OpenAI的Dalle，支持根據文本生成圖片',
			href: '/apps/chat/dalle',
			tags: ['NEW', '穩定', '免翻'],
			cover: '/screenshots/dalle2.png',
		},
	},
	
	notify: {
		errorUserEmpty: ' 用戶名不能爲空！請先注冊登錄再使用！',
		errorSendEmpty: '不能髮送空消息！',
	},
	
	ui: {
		general: {
			btn: {
				send: '髮送',
			},
			textarea: {
				placeholder: '在此處兒輸入~',
			},
		},
		chat: {
			btn: {
				conversations: '會話曆史',
			},
		},
	},
	
	display: {
		navs: {
			user: '用戶',
			services: '服務',
			settings: {
				index: '設置',
				language: '語言',
				theme: '主題',
			},
			about: '關於',
			legal: '法律',
			themes: '主題',
			languages: '語言',
			wallMessages: '留言牆',
		},
		hero: {
			title: ' 歡迎來到CS魔法社！',
			subtitle: '基於計算機技術的一些研究、分享，包括基於OpenAI的chatGPT、Dalle模型等',
			entrance: '開啟您的新世界',
		},
		website: {
			platformName: 'CS魔法社',
			avatarPlaceholder: '登錄',
		},
	},
}

export default tc
