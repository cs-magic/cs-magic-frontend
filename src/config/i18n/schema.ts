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
	hero: {
		title: string
		subtitle: string
		entrance: string
	},
	website: {
		platformName: string
		avatarPlaceholder: string
	},
	user: {
		planning: ILink
		profile?: ILink // todo: dynamic
	}
	projects: {
		chatGPT: IProjectItem
		dalle: IProjectItem
	},
	abouts: {
		contactUS: ILink
		versions:ILink
		jobs?: ILink
	},
	legals: {
		termOfUse?: ILink
		privacyPolicy?: ILink
		CookiePolicy?: ILink
	},
	routes: {
		admin: {
			home: string
		}
		home: string
		apps: {
			chat: string
			chatGPT: string
			dalle: string
		}
		user: {
			planning: string
			wall: string
		}
		about: {
			versions: string
			sponsors: string
			us: string
		},
		auth: {
			home: string
		}
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
		}
	}
}
