import { IProjectItem } from '@/components/shared/ProjectItemComp'
import { schemaCN } from '@/i18n/langs/cn'
import { UserPlanningType } from '@/ds/user'
import { IFeature } from '@/ds/general'
import { INavbarItem } from '@/components/shared/NavBarComp'
import { IUserPlanningPurchaseComp } from '@/ds/userPlanning'

export const u = schemaCN

export const generalFeatures: IFeature[] = [
	{ name: '支持 ChatGPT-4 模型聊天（待开发）', status: 'todo' },
	{ name: '支持 MidJourney 图形服务（待开发）', status: 'todo' },
	{ name: '支持 OpenAI 其他服务（待开发）', status: 'todo' },
	{ name: '拥有产品开发建议资格', status: 'finished' },
]
export const userPlanningPurchaseList: IUserPlanningPurchaseComp[] = [
	{
		name: UserPlanningType.vip,
		cover: '/figures/哈利波特-赫敏.jpg',
		tags: ['轻量'],
		features: [
			...generalFeatures,
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
			{ name: '拥有铂金用户展示墙', status: 'finished' },
		],
		prices: {
			period: {
				month: 20,
				year: 200,
			},
		},
		chatgptTokens: 50,
	},
	
	{
		name: UserPlanningType.blackVip,
		cover: '/figures/哈利波特-尸.jpg',
		tags: ['限定', '邀请制'],
		features: [
			...generalFeatures,
			{ name: '拥有黑金用户展示墙', status: 'finished' },
			{ name: '拥有隐藏应用体验权限', status: 'finished' },
		],
		prices: {
			period: {
				month: 100,
				year: 1000,
			},
		},
		chatgptTokens: 300,
	},
]

export const projects: IProjectItem[] = [
	{
		name: u.routes.service.chatGPT,
		desc: '基于OpenAI的ChatGPT，支持与AI连续对话',
		href: '/apps/chat/chatGPT',
		coverUrl: '/screenshots/chatgpt.png',
		features: ['NEW', '稳定', '免翻'],
	},
	
	{
		name: u.routes.service.dalle,
		desc: '基于OpenAI的Dalle，支持根据文本生成图片',
		href: '/apps/chat/dalle',
		coverUrl: '/screenshots/dalle2.png',
		features: ['NEW', '稳定', '免翻'],
	},
]


export const navbarItems: INavbarItem[][] = [
	[
		{ href: '/', name: u.routes.home },
	],
	projects,
	[
		{ href: '/user-planning', name: u.routes.user.planning },
		{ href: '/wall-messages', name: u.routes.user.wall },
	],
	[
		{ href: '/about/versions', name: u.routes.about.versions },
		{ href: '/about/sponsors', name: u.routes.about.sponsors },
		{ href: '/about/us', name: u.routes.about.us },
	],
]

export const routers: { [key: string]: INavbarItem } = {
	home: navbarItems[0][0],
	appChatChatGPT: navbarItems[1][0],
	appChatDalle: navbarItems[1][1],
	userPlanning: navbarItems[2][0],
	wallMessages: navbarItems[2][1],
	aboutVersions: navbarItems[3][0],
	aboutSponsors: navbarItems[3][1],
	aboutUS: navbarItems[3][2],
}


