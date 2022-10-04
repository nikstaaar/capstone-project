import {useSession, signIn, signOut} from 'next-auth/react';
import Head from 'next/head';

import Layout from '../components/Layout';

export default function HomePage() {
	const {data: session} = useSession();
	return (
		<Layout>
			<Head>
				<title key="title">My Project</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			{session ? (
				<>
					<span>Hallo </span> <span>{session.user.name}</span>
					<a href="#" onClick={signOut}>
						Logout
					</a>
				</>
			) : (
				<a href="#" onClick={signIn}>
					Login
				</a>
			)}
			<h1>Home</h1>
		</Layout>
	);
}
