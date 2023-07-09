import { II18nSchema } from '@/config/i18n/schema'

export const jp: II18nSchema = {
	routers: {
		home: 'ホーム',
		admin: {
			console: 'コンソール',
			wechat: '微信机器人',
		},
		auth: {
			signin: 'ログイン',
			register: 'Sign Up',
		},
		user: {
			planning: '会員制度',
			wallMessages: 'メッセージウォール',
		},
		about: {
			contactUS: 'お問い合わせ先',
			jobs: '私たちのグループに参加する',
			versions: 'バージョン履歴',
		},
		legals: {
			termOfUse: '規約と条件の説明',
			privacyPolicy: '個人情報保護方針',
		},
		apps: {
			chat: {
				chatGPT: 'ChatGPT チャット',
				dalle: 'Dalle 画像を作成',
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
		auth: {
			username: 'Username',
			password: 'Password',
			enterEmail: 'Enter Your Email Address',
			enterVerificationCode: 'Enter the Verification Code',
			enterUsername: 'Enter Your Username',
			enterPassword: 'Enter Your Password',
			confirmPassword: 'Confirm Your Password',
			ok: 'OK',
			askForInvitationCode: 'Enter your Invitation Code (if you have it)',
			finishedAuth: 'Start Your Journey',
		},
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
