/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		minimumCacheTTL: 3600,
		domains: [
			'www.thecocktaildb.com',
			'source.unsplash.com',
			'images.pexels.com',
			'images.unsplash.com',
			'res.cloudinary.com',
			'avatars.githubusercontent.com',
		],
	},
};

module.exports = nextConfig;
