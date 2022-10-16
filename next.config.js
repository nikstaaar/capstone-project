/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			'www.thecocktaildb.com',
			'source.unsplash.com',
			'images.pexels.com',
			'images.unsplash.com',
			'res.cloudinary.com',
		],
	},
};

module.exports = nextConfig;
