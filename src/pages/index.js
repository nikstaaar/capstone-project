import Head from 'next/head';
import {useEffect} from 'react';

import Login from '../components/Login';
import cocktailsStore from '../hooks/cocktailsStore';
import ingredientsStore from '../hooks/ingredientsStore';

export default function HomePage() {
	const ingredients = ingredientsStore(state => state.ingredients);
	const fetchIngredients = ingredientsStore(state => state.fetchIngredients);
	const fetchCocktails = cocktailsStore(state => state.fetchCocktails);

	const imageURLsToPreload = ingredients.map(ingredient => ingredient.image);

	useEffect(() => {
		fetchIngredients('/api/mongoIngredients');
	}, [fetchIngredients]);

	useEffect(() => {
		fetchCocktails('/api/cocktails');
	}, [fetchCocktails]);

	function prefetchImage(url) {
		const img = new Image();
		img.src = url;
	}

	imageURLsToPreload.forEach(url => {
		prefetchImage(url);
	});

	return (
		<>
			<Head>
				<title key="title">My Project</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			<video
				autoPlay
				loop
				muted
				style={{position: 'absolute', objectFit: 'fill', width: '100%', height: '100%'}}
				type="video/mp4"
			>
				<source src="/loginbg.mp4"></source>
			</video>
			<Login />
		</>
	);
}
