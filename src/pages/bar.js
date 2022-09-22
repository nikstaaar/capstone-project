import Head from 'next/head';
import {useEffect} from 'react';

import Layout from '../components/Layout';
import useStore from '../hooks/useStore';

export default function BarPage() {
	const fetchIngredients = useStore(state => state.fetchSomething);
	const setFilteredIngredients = useStore(state => state.setFilteredIngredients);
	const ingredients = useStore(state => state.fetchedData);
	const filteredIngredients = useStore(state => state.filteredIngredients);

	useEffect(() => {
		fetchIngredients('/api/mongoIngredients');
	}, [fetchIngredients]);

	return (
		<Layout>
			<Head>
				<title key="title">My Bar</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<>
				<h1>My Bar</h1>
				<form
					onSubmit={event => {
						event.preventDefault();
						const formData = new FormData(event.target);
						const formValues = Object.fromEntries(formData);
						const values = formValues.search;
						const items = ingredients?.filter(ingredient =>
							ingredient.name.toLowerCase().includes(values.toLowerCase())
						);

						setFilteredIngredients(items);
					}}
				>
					<input type="search" name="search"></input>
					<button type="submit">submit</button>
				</form>

				<ul>
					{filteredIngredients.map(ingredient => {
						return (
							<li key={ingredient._id}>
								<h2>{ingredient.name}</h2>
							</li>
						);
					}) ?? 'not loaded yet'}
				</ul>
			</>
		</Layout>
	);
}
