import Head from 'next/head';
import {useState, useEffect} from 'react';

import Layout from '../components/Layout';
import Search from '../components/Search';
import {Button} from '../components/styled/Button.styled';
import {IngredientCard} from '../components/styled/IngredientCard.styled';
import {IngredientGrid} from '../components/styled/IngredientCard.styled';
import useStore from '../hooks/useStore';

export default function BarPage() {
	const fetchIngredients = useStore(state => state.fetchIngredients);
	const searchItem = useStore(state => state.searchItem);
	const setFilteredIngredients = useStore(state => state.setFilteredIngredients);
	const ingredients = useStore(state => state.ingredients);
	const filteredIngredients = useStore(state => state.filteredIngredients);
	const updateIngredients = useStore(state => state.updateIngredients);
	const [saveMode, setSaveMode] = useState(false);

	useEffect(() => {
		fetchIngredients('/api/mongoIngredients');
	}, [fetchIngredients]);

	useEffect(() => {
		const items = ingredients.filter(ingredient =>
			ingredient.name.toLowerCase().includes(searchItem.toLowerCase())
		);
		setFilteredIngredients(items);
	}, [ingredients]);

	useEffect(() => {
		const items = ingredients.filter(ingredient =>
			ingredient.name.toLowerCase().includes(searchItem.toLowerCase())
		);

		setFilteredIngredients(items);
	}, [searchItem]);

	return (
		<Layout>
			<Head>
				<title key="title">My Bar</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<>
				<Search />
				<IngredientGrid>
					{filteredIngredients.map(ingredient => {
						{
							return saveMode || ingredient.saved ? (
								<IngredientCard
									color={ingredient.color}
									mode={saveMode}
									saved={ingredient.saved}
									key={ingredient._id}
								>
									<h2>{ingredient.name}</h2>
									{saveMode && !ingredient.saved ? (
										<Button
											onClick={() =>
												updateIngredients({
													...ingredient,
													saved: true,
												})
											}
										>
											+
										</Button>
									) : (
										<Button
											onClick={() =>
												updateIngredients({
													...ingredient,
													saved: false,
												})
											}
										>
											X
										</Button>
									)}
								</IngredientCard>
							) : undefined;
						}
					})}
				</IngredientGrid>
				{!saveMode ? (
					<Button
						onClick={() => {
							setSaveMode(true);
						}}
					>
						+
					</Button>
				) : (
					<Button
						onClick={() => {
							setSaveMode(false);
							setFilteredIngredients(ingredients);
						}}
					>
						Done
					</Button>
				)}
				{console.log(ingredients)}
			</>
		</Layout>
	);
}
