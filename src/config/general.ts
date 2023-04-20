import { INavbarItem } from '@/ds/navbar'

export const routers: Record<string, INavbarItem> = {
	home: { href: '/', nameKey: 'routes.home' },
	userPlanning: { href: '/user-planning', nameKey: 'routes.user.planning' },
	wallMessages: { href: '/wall-messages', nameKey: 'routes.user.wall' },
	aboutVersions: { href: '/about/versions', nameKey: 'routes.about.versions' },
	aboutSponsors: { href: '/about/sponsors', nameKey: 'routes.about.sponsors' },
	aboutUS: { href: '/about/us', nameKey: 'routes.about.us' },
}

export const themes = ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter']
