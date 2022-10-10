import {useSession} from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import {useEffect} from 'react';

import Layout from '../components/Layout';
import ingredientsStore from '../hooks/ingredientsStore';

export default function BarPage() {
	const {data: session} = useSession();
	const fetchSavedIngredients = ingredientsStore(state => state.fetchSavedIngredients);
	const savedIngredients = ingredientsStore(state => state.savedIngredients);

	useEffect(() => {
		fetchSavedIngredients(`/api/users/${session.user.email}`);
	}, [fetchSavedIngredients]);

	return (
		<Layout>
			<Head>
				<title key="title">My Bar</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<h1>Hi</h1>
			<button
				onClick={() => {
					console.log(savedIngredients);
				}}
			>
				click
			</button>

			<Link href="/select">Add more Ingredients</Link>
		</Layout>
	);
}
