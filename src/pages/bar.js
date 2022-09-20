import Head from 'next/head';
import {useState} from 'react';
import {useEffect} from 'react';

import Layout from '../components/Layout';

export default function BarPage() {
	const [data, setData] = useState();
	useEffect(() => {
		async function fetchData() {
			const response = await fetch('/api/mongoIngredients');
			const json = await response.json();
			setData(json);
			console.log(json);
		}
		fetchData();
	}, []);

	const [filteredIngredients, setFilteredIngredients] = useState([
		{name: 'foo', id: 1},
		{name: 'bar', id: 2},
	]);

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
						const values = formValues.input;
						const items = data?.filter(ingredient =>
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
							<li key={ingredient.id}>
								<h2>{ingredient.name}</h2>
							</li>
						);
					})}
				</ul>
			</>
		</Layout>
	);
}
