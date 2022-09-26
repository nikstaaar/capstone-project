import Head from 'next/head';
import {useState, useEffect} from 'react';

import Layout from '../components/Layout';
import useStore from '../hooks/useStore';

export default function BarPage() {
	const fetchIngredients = useStore(state => state.fetchSomething);
	const searchItem = useStore(state => state.searchItem);
	const setSearchItem = useStore(state => state.setSearchItem);
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
				<h1>My Bar</h1>

				<input
					value={searchItem}
					onChange={event => {
						event.preventDefault();
						const search = event.target.value;
						setSearchItem(search);
					}}
					type="search"
					name="search Ingredient"
				></input>

				<ul>
					{filteredIngredients.map(ingredient => {
						{
							return saveMode || ingredient.saved ? (
								<li key={ingredient._id}>
									<h2>{ingredient.name}</h2>
									{saveMode && !ingredient.saved ? (
										<button
											onClick={() =>
												updateIngredients({
													...ingredient,
													saved: true,
												})
											}
										>
											save
										</button>
									) : (
										<button
											onClick={() =>
												updateIngredients({
													...ingredient,
													saved: false,
												})
											}
										>
											remove
										</button>
									)}
								</li>
							) : undefined;
						}
					})}
				</ul>
				{!saveMode ? (
					<button
						onClick={() => {
							setSaveMode(true);
						}}
					>
						Save Mode
					</button>
				) : (
					<button
						onClick={() => {
							setSaveMode(false);
							setFilteredIngredients(ingredients);
						}}
					>
						Exit Save Mode
					</button>
				)}
				{console.log(ingredients)}
			</>
		</Layout>
	);
}
