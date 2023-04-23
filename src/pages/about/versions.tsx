import { RootLayout } from '@/components/layouts/RootLayout'
import { clsx } from 'clsx'
import { useLang } from '@/hooks/use-lang'
import ReactMarkdown from 'react-markdown'
import { useGetVersionsHistoryQuery } from '@/api/remoteApi'
import { CentralLoadingComp } from '@/components/general/CentralLoadingComp'
import remarkEmoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'


export const VersionsPage = () => {
	const u = useLang()
	const { data: content } = useGetVersionsHistoryQuery(undefined, { refetchOnFocus: true, refetchOnMountOrArgChange: true })
	
	return (
		<RootLayout title={u.routers.about.versions}>
			{
				!content ? <CentralLoadingComp/> : (
					<article className={clsx(
						'max-w-[720px] mx-auto prose dark:prose-invert',
					)}>
						<ReactMarkdown remarkPlugins={[remarkGfm, remarkEmoji]}>
							{content}
						</ReactMarkdown>
					</article>
				)
			}
		</RootLayout>
	)
}


export default VersionsPage
