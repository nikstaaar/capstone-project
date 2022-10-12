import {useSession} from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import {useEffect} from 'react';

import Layout from '../components/Layout';
import Search from '../components/Search';
import cocktailsStore from '../hooks/cocktailsStore';
import ingredientsStore from '../hooks/ingredientsStore';

export default function CocktailPage() {
	const {data: session} = useSession();
	const fetchCocktails = cocktailsStore(state => state.fetchCocktails);
	const cocktails = cocktailsStore(state => state.cocktails);
	const fetchSavedIngredients = ingredientsStore(state => state.fetchSavedIngredients);
	const savedIngredients = ingredientsStore(state => state.savedIngredients);
	const searchItem = ingredientsStore(state => state.searchItem);

	useEffect(() => {
		if (session) {
			fetchSavedIngredients(`/api/users/${session.user.email}`);
		}
	}, [fetchSavedIngredients, session]);

	useEffect(() => {
		fetchCocktails('/api/cocktails');
	}, [fetchCocktails]);

	const ingredientNames = savedIngredients?.map(ingredient => {
		return ingredient.name;
	});
	const isAvailable = currentIngredient => {
		return ingredientNames?.includes(currentIngredient);
	};

	return (
		<Layout>
			<Head>
				<title key="title">My Bar</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<Search></Search>

			{cocktails.map(cocktail => {
				const ingredients = cocktail.ingredients.names;
				return cocktail.name.toLowerCase().includes(searchItem.toString().toLowerCase()) &&
					ingredients.every(isAvailable) ? (
					<li key={cocktail.id}>
						{cocktail.name}
						<Image
							src={cocktail.image}
							alt={cocktail.name}
							width="100px"
							height="100px"
						></Image>
					</li>
				) : undefined;
			})}
		</Layout>
	);
}
