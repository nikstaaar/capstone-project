import {useSession} from 'next-auth/react';
import Head from 'next/head';
import {useState} from 'react';
import {useEffect} from 'react';

import Layout from '../components/Layout';
import Search from '../components/Search';
import {IngredientCard, IngredientGrid} from '../components/styled/IngredientCard.styled';
import ingredientsStore from '../hooks/ingredientsStore';

export default function BarPage() {
	const {data: session} = useSession();
	const fetchIngredients = ingredientsStore(state => state.fetchIngredients);
	const ingredients = ingredientsStore(state => state.ingredients);
	const searchItem = ingredientsStore(state => state.searchItem);
	const [moreIngredients, setMoreIngredients] = useState([]);
	const fetchSavedIngredients = ingredientsStore(state => state.fetchSavedIngredients);
	useEffect(() => {
		if (session) {
			fetchSavedIngredients(`/api/users/${session.user.email}`);
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

	return (
		<Layout>
			<Head>
				<title key="title">My Bar</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<Search></Search>
			<IngredientGrid>
				{ingredients.map(ingredient => {
					return ingredient.name
						.toLowerCase()
						.includes(searchItem.toString().toLowerCase()) ? (
						<IngredientCard key={ingredient._id} color={ingredient.color}>
							<p>{ingredient.name}</p>
							<button
								type="button"
								onClick={() => {
									setMoreIngredients([...moreIngredients, ingredient._id]);
								}}
							>
								add
							</button>
						</IngredientCard>
					) : undefined;
				})}
			</IngredientGrid>

			<button onClick={update}>save</button>
		</Layout>
	);
}
