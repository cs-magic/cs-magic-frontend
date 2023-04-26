import { RootLayout } from '@/components/layouts/RootLayout'
import { clsx } from 'clsx'
import { useLang } from '@/hooks/use-lang'
import ReactMarkdown from 'react-markdown'
import { useLazyGetVersionsHistoryQuery } from '@/api/remoteApi'
import { CentralLoadingComp } from '@/components/general/CentralLoadingComp'
import remarkGfm from 'remark-gfm'
import remarkEmoji from 'remark-emoji'
// @ts-ignore
import remarkCollapse from 'remark-collapse'
import { useEffect } from 'react'


export const VersionsPage = () => {
	const u = useLang()
	const [getVersionHistory, { data: content }] = useLazyGetVersionsHistoryQuery({ pollingInterval: 0 })
	
	useEffect(() => {
		getVersionHistory(undefined, false) // false means disable cache, ref: https://stackoverflow.com/a/72926373/9422455
	}, [])
	
	console.log({ content })
	
	return (
		<RootLayout title={u.routers.about.versions}>
			{
				!content ? <CentralLoadingComp/> : (
					<article className={clsx(
						'max-w-[720px] mx-auto prose dark:prose-invert',
					)}>
						<ReactMarkdown remarkPlugins={[
							remarkGfm,
							remarkEmoji,
							[remarkCollapse, { test: 'detail' }], // ref: https://www.npmjs.com/package/remark-collaps
						]}>
							{content}
						</ReactMarkdown>
					</article>
				)
			}
		</RootLayout>
	)
}


export default VersionsPage
