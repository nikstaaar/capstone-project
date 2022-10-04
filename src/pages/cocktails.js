import Head from 'next/head';
import {useEffect} from 'react';

import Layout from '../components/Layout';
import useStore from '../hooks/useStore';

export default function CocktailPage() {
	const fetchCocktails = useStore(state => state.fetchCocktails);
	const cocktails = useStore(state => state.cocktails);
	const ingredients = useStore(state => state.ingredients);

	const availableIngredients = ingredients.filter(ingredient => ingredient.saved === true);

	console.log(availableIngredients);

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
