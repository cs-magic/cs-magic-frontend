import { RootLayout } from '@/components/layouts/RootLayout'
import { clsx } from 'clsx'
import { GetServerSideProps } from 'next'
import { useLang } from '@/hooks/use-lang'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'


export const VersionsPage = ({ content }: { content: string }) => {
	const u = useLang()
	console.log({ content })
	
	return (
		<RootLayout title={u.routers.about.versions}>
			<article className={clsx(
				'max-w-[720px] mx-auto prose dark:prose-invert',
			)}>
				<ReactMarkdown>
					{content}
				</ReactMarkdown>
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
