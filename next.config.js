/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['www.thecocktaildb.com', 'source.unsplash.com'],
	},
};

module.exports = nextConfig;
