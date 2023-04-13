import { IProjectItem } from '@/components/shared/ProjectItemComp'
import { schemaCN } from '@/i18n/langs/cn'
import { UserPlanningType } from '@/ds/user'
import { IFeature } from '@/ds/general'
import { INavbarItem } from '@/components/shared/NavBarComp'
import { IUserPlanningPurchaseComp } from '@/ds/userPlanning'

export const projects: IProjectItem[] = [
	{
		name: 'ChatGPT',
		desc: '镜像ChatGPT',
		coverUrl: '/screenshots/chatgpt.png',
		features: ['NEW', '稳定', '免翻'],
		targetUrl: '/chat',
	},
]

export const u = schemaCN

export const generalFeatures: IFeature[] = [
	{ name: '支持 ChatGPT-4 模型聊天（待开发）', status: 'todo' },
	{ name: '支持 MidJourney 图形服务（待开发）', status: 'todo' },
	{ name: '支持 OpenAI 其他服务（待开发）', status: 'todo' },
]
export const userPlanningPurchaseList: IUserPlanningPurchaseComp[] = [
	{
		name: UserPlanningType.vip,
		cover: '/figures/哈利波特-赫敏.jpg',
		tags: ['轻量'],
		features: [
			...generalFeatures,
			{ name: '拥有黄金展示墙权限', status: 'finished' },
		],
		prices: {
			quantity: 10,
		},
		chatgptTokens: 20,
	},
	
	{
		name: UserPlanningType.sVip,
		cover: '/figures/哈利波特-波特.jpg',
		tags: ['尊享'],
		features: [
			...generalFeatures,
			{ name: '拥有铂金展示墙权限', status: 'finished' },
			{ name: '您的需求将会被优先考虑', status: 'finished' },
		],
		prices: {
			quantity: 20,
		},
		chatgptTokens: 50
	},
	
	{
		name: UserPlanningType.blackVip,
		cover: '/figures/哈利波特-尸.jpg',
		tags: ['限定', '邀请制'],
		features: [
			...generalFeatures,
			{ name: '拥有黑金展示墙权限', status: 'finished' },
			{ name: '您的需求将首先被考虑', status: 'finished' },
			{ name: '拥有隐藏应用体验权限', status: 'finished' },
		],
		prices: {
			period: {
				month: 100,
				year: 1000
			}
		},
		chatgptTokens: 300,
	},
]


export const adminIds = [
	'877210964@qq.com',
	'shawninjuly@gmail.com',
	'yyao5@gmu.edu', // 雨青
	'1282148128@qq.com', // jane
	'unisugar.ktrs@gmail.com', // ely
	'2499207452@qq.com', // susan
]

export const navbarItems: INavbarItem[][] = [
	[
		{ href: '/', name: '主页' },
	],
	[
		{ href: '/chat', name: '服务：ChatGPT' },
	],
	[
		{ href: '/user-planning', name: '会员计划' },
	],
	[
		{ href: '/about/versions', name: '版本历史' },
		{ href: '/about/us', name: '关于我们' },
	],
]
