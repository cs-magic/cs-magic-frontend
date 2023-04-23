import { II18nSchema } from '@/config/i18n/schema'

export const jp: II18nSchema = {
	hero: {
		title: 'CSマジッククラブへようこそ。',
		subtitle: 'これは、コンピュータ技術をベースにした研究・共有のためのコミュニティです。OpenAIをベースにしたchatGPT、Dalleなどを含みます。',
		entrance: 'あなたの新しい世界を切り開こう。',
	},
	website: {
		platformName: 'CSマジッククラブ',
		avatarPlaceholder: 'ログイン',
	},
	
	projects: {
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
	
	
	user: {
		planning: {
			href: '/user-planning',
			name: '会员计划',
		},
	},
	
	abouts: {
				versions: {
			href: '/about/versions',
			name: "Versions",
		},
		contactUS: {
			href: '/about/contact',
			name: '開発者について',
		},
		jobs: {
			href: '/about/occupation',
			name: '就職希望',
		},
	},
	
	legals: {
		termOfUse: {
			href: '/legal/term-of-use',
			name: '適用条件',
		},
		privacyPolicy: {
			href: '/legal/privacy-policy',
			name: '個人情報保護方針',
		},
		CookiePolicy: {
			href: '/legal/cookie-policy',
			name: 'Cookieポリシー',
		},
	},
	
	routes: {
		about: {
			versions: 'バージョン履歴',
			sponsors: 'スポンサー',
			us: '開発者について',
		},
		admin: {
			home: 'コンソール',
		},
		home: '首页',
		apps: {
			chat: 'AIとのチャット',
			chatGPT: 'ChatGPT チャット',
			dalle: 'Dalle 画像を作成',
		},
		user: {
			planning: '会員制度',
			wall: 'メッセージウォール',
		},
		auth: {
			home: 'ユーザー',
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
		},
	},
}

export default jp
