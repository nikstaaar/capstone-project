import {useSession} from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import {useEffect} from 'react';

import Layout from '../components/Layout';
import {IngredientGrid, IngredientCard} from '../components/styled/IngredientCard.styled';
import ingredientsStore from '../hooks/ingredientsStore';

export default function BarPage() {
	const {data: session} = useSession();
	const fetchSavedIngredients = ingredientsStore(state => state.fetchSavedIngredients);
	const savedIngredients = ingredientsStore(state => state.savedIngredients);

	useEffect(() => {
		if (session) {
			fetchSavedIngredients(`/api/users/${session.user.email}`);
		}
	}, [fetchSavedIngredients, session]);

	return (
		<Layout>
			<Head>
				<title key="title">My Bar</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<IngredientGrid>
				{!savedIngredients && <>There are no Ingredients in your Bar</>}
				<Link href="/select">Add more Ingredients</Link>
				{savedIngredients?.map(ingredient => {
					return (
						<IngredientCard key={ingredient._id} color={ingredient.color}>
							<p>{ingredient.name}</p>
						</IngredientCard>
					);
				})}
			</IngredientGrid>
		</Layout>
	);
}
