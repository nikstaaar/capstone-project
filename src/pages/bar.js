import {nanoid} from 'nanoid';
import Head from 'next/head';
import {useState} from 'react';

import Layout from '../components/Layout';

export default function BarPage() {
	const [ingredients, setIngredients] = useState([
		{id: nanoid(), name: 'Vodka', color: '3D45F8', saved: false},
		{id: nanoid(), name: 'Rye', color: 'A15C0A', saved: false},
		{id: nanoid(), name: 'Cognac', color: 'B12132', saved: false},
		{id: nanoid(), name: 'Gin', color: '21B1A0', saved: false},
		{id: nanoid(), name: 'Grenadine', color: 'B12192', saved: false},
		{id: nanoid(), name: 'Triple Sec', color: 'FFA318', saved: false},
		{id: nanoid(), name: 'Orgeat', color: 'FAF2CA', saved: false},
		{id: nanoid(), name: 'Campari', color: 'B12132', saved: false},
		{id: nanoid(), name: 'Scotch', color: '565452', saved: false},
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
					onSubmit={() => {
						setIngredients();
					}}
				>
					<input name="ingredient" type="text"></input>
					<button type="submit">submit</button>
				</form>
				<ul>
					{ingredients.map(ingredient => {
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
