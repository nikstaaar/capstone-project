import {useSession} from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect} from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Search from '../components/Search';
import {StyledCocktailCard} from '../components/styled/CocktailCard.styled';
import {CocktailsWrapper} from '../components/styled/CocktailsWrapper.styled';
import cocktailsStore from '../hooks/cocktailsStore';
import ingredientsStore from '../hooks/ingredientsStore';

export default function CocktailPage() {
	const {data: session} = useSession();

	const cocktails = cocktailsStore(state => state.cocktails);
	const fetchSavedIngredients = ingredientsStore(state => state.fetchSavedIngredients);
	const savedIngredients = ingredientsStore(state => state.savedIngredients);
	const searchItem = ingredientsStore(state => state.searchItem);

	const StyledImage = styled(Image)`
		position: absolute;
		bottom: 10px;
		border-radius: 0.45rem;
	`;

	useEffect(() => {
		if (session) {
			fetchSavedIngredients(`/api/users/${session.user.email}`);
		}
	}, [fetchSavedIngredients, session]);

	const ingredientNames = savedIngredients?.map(ingredient => ingredient.name.toLowerCase());
	const alternatives = savedIngredients?.flatMap(ingredient =>
		ingredient.alternatives?.map(alt => alt.toLowerCase())
	);

	const isAvailable = currentIngredient => {
		const lowercaseIngredient = currentIngredient.toLowerCase();
		return (
			ingredientNames?.includes(lowercaseIngredient) ||
			(alternatives && alternatives.includes(lowercaseIngredient))
		);
	};

	console.log(cocktails);

	return (
		<Layout>
			<Head>
				<title key="title">My Bar</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<Search></Search>
			<CocktailsWrapper>
				{cocktails.map(cocktail => {
					const ingredients = cocktail.ingredients.names;
					return cocktail.name
						.toLowerCase()
						.includes(searchItem.toString().toLowerCase()) &&
						ingredients.every(isAvailable) ? (
						<Link key={cocktail.id} href={`/details/${cocktail.id}`}>
							<StyledCocktailCard>
								<h4>{cocktail.name}</h4>
								<StyledImage
									src={cocktail.image}
									alt={cocktail.name}
									width="70px"
									height="70px"
								></StyledImage>
							</StyledCocktailCard>
						</Link>
					) : undefined;
				})}
			</CocktailsWrapper>
		</Layout>
	);
}
