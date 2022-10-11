import {useSession} from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import {useEffect} from 'react';

import Check from '../components/Check';
import Layout from '../components/Layout';
import Search from '../components/Search';
import {IngredientCard, IngredientGrid} from '../components/styled/IngredientCard.styled';
import ingredientsStore from '../hooks/ingredientsStore';

export default function BarPage() {
	const {data: session} = useSession();
	const fetchIngredients = ingredientsStore(state => state.fetchIngredients);
	const ingredients = ingredientsStore(state => state.ingredients);
	const searchItem = ingredientsStore(state => state.searchItem);
	const setMoreIngredients = ingredientsStore(state => state.setMoreIngredients);
	const moreIngredients = ingredientsStore(state => state.moreIngredients);
	const fetchSavedIngredients = ingredientsStore(state => state.fetchSavedIngredients);
	const savedIngredients = ingredientsStore(state => state.savedIngredients);
	const savedIngredientsNames = savedIngredients?.map(ingredient => ingredient.name);

	useEffect(() => {
		if (session) {
			fetchSavedIngredients(`/api/users/${session.user.email}`);
			const savedIngredientsIds = savedIngredients?.map(ingredient => ingredient._id);
			setMoreIngredients(savedIngredientsIds);
		}
	}, [fetchSavedIngredients, session]);

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
	{
		console.log(moreIngredients);
	}
	return (
		<Layout>
			<Head>
				<title key="title">My Bar</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<Search></Search>
			<IngredientGrid>
				{ingredients.map(ingredient => {
					const saved = savedIngredientsNames?.includes(ingredient.name);
					return ingredient.name
						.toLowerCase()
						.includes(searchItem.toString().toLowerCase()) ? (
						<IngredientCard key={ingredient._id} color={ingredient.color}>
							<p>{ingredient.name}</p>
							<Check
								saved={saved}
								ingredient={ingredient._id}
								moreIngredients={moreIngredients}
							></Check>
						</IngredientCard>
					) : undefined;
				})}
			</IngredientGrid>
			<Link href="/bar">
				<button onClick={update}>save</button>
			</Link>
			<Link href="/bar">cancel</Link>
		</Layout>
	);
}
