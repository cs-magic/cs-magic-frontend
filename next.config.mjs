import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import rehypePrism from 'rehype-prism'
import nextra from 'nextra'

// mdx support, ref: https://nextjs.org/docs/advanced-features/using-mdx
const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		// If you use remark-gfm, you'll need to use next.config.mjs
		// as the package is ESM only
		// https://github.com/remarkjs/remark-gfm#install
		remarkPlugins: [
			remarkGfm,
			remarkEmoji,
			// [remarkCollapse, {test: 'detail'}], // ref: https://www.npmjs.com/package/remark-collaps
		],
		rehypePlugins: [
			rehypePrism,
		],
		// If you use `MDXProvider`, uncomment the following line.
		providerImportSource: "@mdx-js/react",
	},
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Configure pageExtensions to include md and mdx
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	// Optionally, add any other Next.js config below
	reactStrictMode: true,
	
	// output: 'export', // ref: https://nextjs.org/docs/advanced-features/static-html-export
	
	distDir: '.' + (process.env.ENV || 'next'),
	
	// ref: https://nextjs.org/docs/api-reference/next/image#remote-patterns
	images: {
		remotePatterns: [// ref:https://stackoverflow.com/a/73951135/9422455
			{protocol: "http", hostname: "**"},
			{protocol: "https", hostname: "**"},
		]
	},
	
	// 必须加以下两个以屏蔽内部库的错误
	ignoreDuringBuilds: true, // suppress eslint, ref: https://nextjs.org/docs/api-reference/next.config.js/ignoring-eslint
	typescript: {
		ignoreBuildErrors: true
	},
	
}

const withNextra = nextra({
	theme: 'nextra-theme-docs',
	themeConfig: './theme.config.jsx'
})

// Merge MDX config with Next.js config
export default withNextra(
	// withMDX(
	nextConfig
	// )
)
