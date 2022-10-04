import Head from 'next/head';

import Layout from '../components/Layout';
import Login from '../components/Login';

export default function HomePage() {
	return (
		<Layout>
			<Head>
				<title key="title">My Project test</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			<Login />
		</Layout>
	);
}
