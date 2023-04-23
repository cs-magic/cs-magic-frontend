import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";

const allDomains = [// ref:https://stackoverflow.com/a/73951135/9422455
	{protocol: "http", hostname: "**"}, {protocol: "https", hostname: "**"},
]

// mdx support, ref: https://nextjs.org/docs/advanced-features/using-mdx
const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		// If you use remark-gfm, you'll need to use next.config.mjs
		// as the package is ESM only
		// https://github.com/remarkjs/remark-gfm#install
		remarkPlugins: [
			remarkGfm
		],
		rehypePlugins: [],
		// If you use `MDXProvider`, uncomment the following line.
		// providerImportSource: "@mdx-js/react",
	},
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Configure pageExtensions to include md and mdx
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	// Optionally, add any other Next.js config below
	reactStrictMode: false,
	
	distDir: '.' + (process.env.ENV || 'next'),
	
	// ref: https://nextjs.org/docs/api-reference/next/image#remote-patterns
	images: {
		remotePatterns: allDomains
	},
	
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
