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
	projects: {
		chatGPT: IProjectItem
		dalle: IProjectItem
	}
	abouts: {
		aboutUS: ILink
		contact: ILink
		jobs: ILink
	}
	legals: {
		termOfUse: ILink
		privacyPolicy: ILink
		CookiePolicy: ILink
	}
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
}
