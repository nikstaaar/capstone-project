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
import useStore from '../hooks/useStore';

export default function CocktailPage() {
	const {data: session} = useSession();

	const cocktails = useStore(cocktailsStore, state => state.cocktails);
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

	console.log(cocktails);

	return (
		<Layout>
			<Head>
				<title key="title">My Bar</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<Search />
			<CocktailsWrapper>
				{cocktails?.map(cocktail => {
					const ingredients = cocktail.ingredients.names;
					const lowercaseSearch = searchItem.toString().toLowerCase();
					const cocktailName = cocktail.name.toLowerCase();

					const isAvailable = ingredients.every(
						ingredient =>
							ingredientNames?.includes(ingredient.toLowerCase()) ||
							(alternatives && alternatives.includes(ingredient.toLowerCase()))
					);

					if (cocktailName.startsWith(lowercaseSearch) && isAvailable) {
						return (
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
						);
					}
					return null;
				})}
			</CocktailsWrapper>
		</Layout>
	);
}
