import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";


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
	reactStrictMode: true,
	
	distDir: '.' + (process.env.ENV || 'next'),
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig)