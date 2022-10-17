import {useSession} from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import {useEffect} from 'react';

import Layout from '../components/Layout';
import Search from '../components/Search';
import SelectCard from '../components/SelectCard';
import {StyledIngredientGrid} from '../components/styled/IngredientCard.styled';
import {MoreButton} from '../components/styled/MoreButton.styled';
import ingredientsStore from '../hooks/ingredientsStore';

export default function BarPage() {
	const {data: session} = useSession();
	const fetchIngredients = ingredientsStore(state => state.fetchIngredients);
	const ingredients = ingredientsStore(state => state.ingredients);
	const searchItem = ingredientsStore(state => state.searchItem);
	const setSearchItem = ingredientsStore(state => state.setSearchItem);
	const moreIngredients = ingredientsStore(state => state.moreIngredients);

	useEffect(() => {
		setSearchItem('');
	}, []);

	useEffect(() => {
		fetchIngredients('/api/mongoIngredients');
	}, [fetchIngredients]);

	async function update() {
		await fetch(`/api/users/${session.user.email}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(moreIngredients),
		});
	}
	return (
		<Layout>
			<Head>
				<title key="title">My Bar</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<Search></Search>
			<StyledIngredientGrid>
				{ingredients.map(ingredient => {
					return ingredient.name
						.toLowerCase()
						.includes(searchItem.toString().toLowerCase()) ? (
						<SelectCard ingredient={ingredient}></SelectCard>
					) : undefined;
				})}
			</StyledIngredientGrid>
			<Link href="/bar">
				<MoreButton top="70%" onClick={update}>
					save
				</MoreButton>
			</Link>
			<MoreButton top="80%">
				<Link href="/bar">Back</Link>
			</MoreButton>
		</Layout>
	);
}
