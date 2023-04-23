import { II18nSchema } from '@/config/i18n/schema'

export const jp: II18nSchema = {
	routers: {
				home: '主页',
		admin: {
			home: '控制台',
		},
				auth: {
			signin: '登录系统',
		},
		user: {
			planning: '会员计划',
			wallMessages: '留言墙',
		},
		abouts: {
			contactUS: '联系我们',
			jobs: '加入我们',
			versions: '版本历史',
		},
		legals: {
			termOfUse: '条款说明',
			CookiePolicy: 'Cookie政策',
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
			name: 'ChatGPT チャット',
			desc: 'OpenAIをベースにしたChatGPT、AIとの継続的な対話をサポートできます。',
			href: '/apps/chat/chatGPT',
			tags: ['新しい', '安定', 'ミラーサイト'],
			cover: '/screenshots/chatgpt.png',
		},
		dalle: {
			name: 'Dalle 画像を作成',
			desc: 'OpenAIをベースにしたDalle、テキストからの画像生成に対応できます。',
			href: '/apps/chat/dalle',
			tags: ['新しい', '安定', 'ミラーサイト'],
			cover: '/screenshots/dalle2.png',
		},
	},
	
	notify: {
		errorUserEmpty: 'ユーザー名を空欄にすることはできません。ご利用の前に、登録とログインをお願いします。',
		errorSendEmpty: '空メッセージは送信できません。',
	},
	
	ui: {
		general: {
			btn: {
				send: '送信',
			},
			textarea: {
				placeholder: 'ここに入力してください。',
			},
		},
		chat: {
			btn: {
				conversations: '会話の記録',
			},
		},
	},
	
	display: {
		navs: {
			user: '用户',
			services: 'サービス',
			settings: {
				index: '設定',
				language: '言語',
				theme: 'テーマ',
			},
			about: 'このサイトについて',
			legal: '法律',
			themes: '主题',
			languages: '语言',
			wallMessages: 'Messages Wall',
		},
		hero: {
			title: 'CSマジッククラブへようこそ。',
			subtitle: 'これは、コンピュータ技術をベースにした研究・共有のためのコミュニティです。OpenAIをベースにしたchatGPT、Dalleなどを含みます。',
			entrance: 'あなたの新しい世界を切り開こう。',
		},
		website: {
			platformName: 'CSマジッククラブ',
			avatarPlaceholder: 'ログイン',
		},
		
	},
}

export default jp
