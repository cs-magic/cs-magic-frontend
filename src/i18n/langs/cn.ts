import { II18nSchema } from '@/i18n/schma'

export const schemaCN: II18nSchema = {
	hero: {
		title: '欢迎来到CS魔法社',
		subtitle: '一群致力于开发友好、稳健、实用、开源的计算机程序造福身边朋友的年轻人社区',
		entrance: '开启您的新世界',
	},
	website: {
		platformName: 'CS魔法社',
		avatarPlaceholder: '登录',
	},
	routes: {
		about: {
			versions: '版本历史',
			sponsors: '赞助商',
			us: "关于我们",
		},
		admin: {
			home: "控制台"
		},
		home: "首页",
		service: {
			chatgpt: "ChatGPT Plus Mirror"
		},
		user: {
			planning: "会员计划",
			wall: "留言墙",
		},
		auth: {
			home: "用户系统",
		}
	},
	notify: {
		errorUserEmpty: "用户名不能为空！请先注册登录再使用！",
		errorSendEmpty: '不能发送空消息！',
	}
}
