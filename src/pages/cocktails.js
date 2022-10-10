import Head from 'next/head';
import {useEffect} from 'react';

import Layout from '../components/Layout';
import cocktailsStore from '../hooks/cocktailsStore';

export default function CocktailPage() {
	const fetchCocktails = cocktailsStore(state => state.fetchCocktails);
	const cocktails = cocktailsStore(state => state.cocktails);

	useEffect(() => {
		fetchCocktails('/api/cocktails');
	}, [fetchCocktails]);

	return (
		<Layout>
			<Head>
				<title key="title">My Bar</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<>
				<ul>
					{cocktails.map(cocktail => {
						return <li key={cocktail.id}>{cocktail.name}</li>;
					})}
				</ul>
			</>
		</Layout>
	);
}
