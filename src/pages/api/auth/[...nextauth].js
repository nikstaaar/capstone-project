import {MongoDBAdapter} from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

import clientPromise from '../../../backend/lib/mongodb.js';

const providers = [];
if (process.env.VERCEL_ENV === 'preview') {
	providers.push(
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				username: {label: 'Username', type: 'text', placeholder: 'jsmith'},
				password: {label: 'Password', type: 'password'},
			},
			async authorize(credentials) {
				if (credentials.username === 'test' && credentials.password === 'test') {
					return {
						name: 'Test User',
						email: 'test@example.com',
					};
				} else {
					return null;
				}
			},
		})
	);
} else {
	providers.push(
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		})
	);
}

export const authOptions = {
	providers,
	debug: process.env.NODE_ENV === 'development',
	adapter: MongoDBAdapter(clientPromise),
};
export default NextAuth(authOptions);
