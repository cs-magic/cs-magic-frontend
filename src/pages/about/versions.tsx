import { RootLayout } from '@/components/layouts/RootLayout'
import { clsx } from 'clsx'
import { GetServerSideProps } from 'next'
import { useLang } from '@/hooks/use-lang'
import axios from 'axios'


export const VersionsPage = ({ content }: { content: string }) => {
	const u = useLang()
	
	return (
		<RootLayout title={u.routers.about.versions}>
			<article className={clsx(
				'prose prose-zinc max-w-[720px] mx-auto',
				'dark:prose-invert',
			)}>
				{content}
			</article>
		</RootLayout>
	)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { data: content } = await axios.get('https://raw.githubusercontent.com/cs-magic/cs-magic-frontend/main/versions.md')
	return {
		props: {
			content,
		},
	}
}


export default VersionsPage
