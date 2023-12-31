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
	const ingredients = ingredientsStore(state => state.ingredients);
	const searchItem = ingredientsStore(state => state.searchItem);
	const setSearchItem = ingredientsStore(state => state.setSearchItem);
	const moreIngredients = ingredientsStore(state => state.moreIngredients);

	useEffect(() => {
		setSearchItem('');
	}, [setSearchItem]);

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
			<Search />
			<StyledIngredientGrid>
				{ingredients?.map(ingredient => {
					const searchQuery = searchItem.toString().toLowerCase();
					const ingredientName = ingredient.name.toLowerCase();

					if (ingredientName.startsWith(searchQuery)) {
						return (
							<SelectCard key={ingredient._id} ingredient={ingredient}></SelectCard>
						);
					} else return null;
				})}
			</StyledIngredientGrid>
			<Link href="/bar">
				<MoreButton top="70%" onClick={update}>
					save
				</MoreButton>
			</Link>

			<Link href="/bar">
				<MoreButton top="80%">back</MoreButton>
			</Link>
		</Layout>
	);
}
