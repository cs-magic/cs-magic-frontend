/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	distDir: '.' + (process.env.ENV || 'next')
}

module.exports = nextConfig
