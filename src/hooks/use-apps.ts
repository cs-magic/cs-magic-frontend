import { useU } from '@/hooks/use-u'

export const useApps = () => {
	const u = useU()
	
	return Object.entries(u.apps)
		.filter(([projectName]) => ['chatGPT'].includes(projectName))
}
