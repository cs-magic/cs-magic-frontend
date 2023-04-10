import { IProjectItem } from '@/components/shared/ProjectItemComp'
import { schemaCN } from '@/i18n/langs/cn'

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
