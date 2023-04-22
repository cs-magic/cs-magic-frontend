import { INavbarItem } from '@/ds/navbar'

export const routers: Record<string, INavbarItem> = {
	home: { href: '/', nameKey: 'routes.home' },
	userPlanning: { href: '/user-planning', nameKey: 'routes.user.planning' },
	wallMessages: { href: '/wall-messages', nameKey: 'routes.user.wall' },
	aboutVersions: { href: '/about/versions', nameKey: 'routes.about.versions' },
	aboutSponsors: { href: '/about/sponsors', nameKey: 'routes.about.sponsors' },
	aboutUS: { href: '/about/us', nameKey: 'routes.about.us' },
}

