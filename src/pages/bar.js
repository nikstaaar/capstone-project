import {useSession} from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import {useEffect} from 'react';

import IngredientCard from '../components/IngredientCard';
import Layout from '../components/Layout';
import Search from '../components/Search';
import {StyledIngredientGrid} from '../components/styled/IngredientCard.styled';
import {MoreButton} from '../components/styled/MoreButton.styled';
import ingredientsStore from '../hooks/ingredientsStore';

export default function BarPage() {
	const {data: session} = useSession();
	const fetchSavedIngredients = ingredientsStore(state => state.fetchSavedIngredients);
	const savedIngredients = ingredientsStore(state => state.savedIngredients);
	const searchItem = ingredientsStore(state => state.searchItem);
	const setSearchItem = ingredientsStore(state => state.setSearchItem);

	useEffect(() => {
		setSearchItem('');
	}, []);

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
			<Search></Search>
			<StyledIngredientGrid>
				{!savedIngredients && <>There are no Ingredients in your Bar</>}
				{savedIngredients?.map(ingredient => {
					return ingredient.name
						.toLowerCase()
						.includes(searchItem.toString().toLowerCase()) ? (
						<IngredientCard ingredient={ingredient}></IngredientCard>
					) : undefined;
				})}
			</StyledIngredientGrid>
			<MoreButton>
				<Link href="/select">
					<h2>ADD</h2>
				</Link>
			</MoreButton>
		</Layout>
	);
}
