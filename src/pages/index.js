import Head from 'next/head';
import {useEffect} from 'react';
import {useStore} from 'zustand';

import Layout from '../components/Layout';

export default function HomePage() {
	useEffect(() => {
		async function fetchData() {
			const response = await fetch('/api/mongoIngredients');
			const json = await response.json();
			handleData(json.data);
		}
		fetchData();
	}, []);

	const handleData = useStore(state => state.handleData);
	return (
		<Layout>
			<Head>
				<title key="title">My Project</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			<h1>Home</h1>
		</Layout>
	);
}
