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
	routes: {
		admin: {
			home: string
		}
		home: string
		service: {
			chatgpt: string
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
