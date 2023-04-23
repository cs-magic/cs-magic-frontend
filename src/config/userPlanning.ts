import { IFeature } from '@/ds/general'
import { IUserPlanningPurchaseComp } from '@/ds/userPlanning'
import { UserPlanningType } from '@/ds/user'

export const generalFeatures: IFeature[] = [
	{ name: '支持 ChatGPT-3.5 模型聊天', status: 'finished' },
	{ name: '支持 Dalle（作图）模型聊天', status: 'finished' },
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
			{ name: '支持 ChatGPT-4 模型聊天（待开发）', status: 'todo' },
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
