import { IRouters } from '@/config/routers'

export interface ILink {
	name: string
	href: string
}

export interface IProjectItem extends ILink {
	desc?: string
	tags: string[]
	cover: string
}

export interface II18nSchema {
	apps: {
		chatGPT: IProjectItem
		dalle: IProjectItem
	},
	notify: {
		errorUserEmpty: string
		errorSendEmpty: string
	},
	ui: {
		general: {
			btn: {
				send: string
			}
			textarea: {
				placeholder: string
			}
		}
		chat: {
			btn: {
				conversations: string
			}
		}
	}
	display: {
		navs: {
			user: string
			services: string
			settings: {
				index: string
				language: string
				theme: string
			}
			about: string
			legal: string
			themes: string
			languages: string
			wallMessages: string
		},
		hero: {
			title: string
			subtitle: string
			entrance: string
		},
		website: {
			platformName: string
			avatarPlaceholder: string
		},
	}
	routers: IRouters
}
