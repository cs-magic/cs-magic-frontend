import { II18nSchema } from '@/i18n/schema'

export const schemaCN: II18nSchema = {
	hero: {
		title: 'Welcome to CS Magic Community!',
		subtitle: 'A community of Gen Z dedicated to developing friendly, robust, practical, and open-source computer programs that benefit friends around us.',
		entrance: 'Open up your new world!',
	},
	website: {
		platformName: 'CS Magic Community',
		avatarPlaceholder: 'Sign In',
	},
	routes: {
		about: {
			versions: 'Version History',
			sponsors: 'Sponsor',
			us: "About Us",
		},
		admin: {
			home: "Console"
		},
		home: "Home",
		service: {
			chat: 'AI Chat',
			chatGPT: "ChatGPT Response Generator",
			dalle: "Dalle Image Generator"
		},
		user: {
			planning: "Membership Plan",
			wall: "Messages Wall",
		},
		auth: {
			home: "User System",
		}
	},
	notify: {
		errorUserEmpty: "Username cannot be empty! Please register and log in before using!",
		errorSendEmpty: 'Cannot send empty message!',
	}
}
