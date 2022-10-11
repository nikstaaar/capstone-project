import {useSession} from 'next-auth/react';
import Head from 'next/head';
import {useState} from 'react';
import {useEffect} from 'react';

import Layout from '../components/Layout';
import {IngredientCard, IngredientGrid} from '../components/styled/IngredientCard.styled';
import ingredientsStore from '../hooks/ingredientsStore';

export default function BarPage() {
	const {data: session} = useSession();
	//const ingredients = ingredientsStore(state => state.ingredients);
	const fetchIngredients = ingredientsStore(state => state.fetchIngredients);
	const ingredients = ingredientsStore(state => state.ingredients);

	const [moreIngredients, setMoreIngredients] = useState([]);

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
			<IngredientGrid>
				{ingredients.map(ingredient => {
					return (
						<IngredientCard key={ingredient._id} color={ingredient.color}>
							<p>{ingredient.name}</p>
							<button
								onClick={() => {
									setMoreIngredients([...moreIngredients, ingredient._id]);
								}}
							>
								add
							</button>
						</IngredientCard>
					);
				})}
			</IngredientGrid>

			<button onClick={update}>save</button>
		</Layout>
	);
}
