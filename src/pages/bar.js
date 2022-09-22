import Head from 'next/head';
import {useState} from 'react';
import {useStore} from 'zustand';

import Layout from '../components/Layout';

export default function BarPage() {
	const ingredients = useStore(state => state.fetchedData);
	const [filteredIngredients, setFilteredIngredients] = useState(null);

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
					{filteredIngredients?.map(ingredient => {
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
