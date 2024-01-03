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
import useStore from '../hooks/useStore';

export default function BarPage() {
	const {data: session} = useSession();
	const fetchSavedIngredients = ingredientsStore(state => state.fetchSavedIngredients);
	const savedIngredients = useStore(ingredientsStore, state => state.savedIngredients);
	const searchItem = ingredientsStore(state => state.searchItem);
	const setSearchItem = ingredientsStore(state => state.setSearchItem);

	useEffect(() => {
		setSearchItem('');
	}, [setSearchItem]);

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
			<Search />
			<StyledIngredientGrid>
				{savedIngredients?.map(ingredient => {
					const searchQuery = searchItem.toString().toLowerCase();
					const ingredientName = ingredient.name.toLowerCase();

					if (ingredientName.startsWith(searchQuery)) {
						return (
							<IngredientCard
								key={ingredient._id}
								ingredient={ingredient}
							></IngredientCard>
						);
					} else return null;
				})}
			</StyledIngredientGrid>
			<MoreButton top="70%">
				<Link href="/select">
					<h2>ADD</h2>
				</Link>
			</MoreButton>
		</Layout>
	);
}
