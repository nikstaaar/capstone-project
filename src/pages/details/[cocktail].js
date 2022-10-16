import {nanoid} from 'nanoid';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import cocktailsStore from '../../hooks/cocktailsStore';
const Details = () => {
	const fetchCocktails = cocktailsStore(state => state.fetchCocktails);
	const cocktails = cocktailsStore(state => state.cocktails);
	const router = useRouter();
	const cocktailID = router.query.cocktail;
	const cocktail = cocktails?.find(cocktail => cocktail.id === cocktailID);
	useEffect(() => {
		fetchCocktails('/api/cocktails');
	}, [fetchCocktails]);
	console.log(cocktail);

	const StyledImage = styled(Image)`
		position: absolute;
		bottom: 10px;
		border-radius: 0.45rem;
	`;
	return (
		<Layout>
			<Head>
				<title key="title">My Bar</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<div>
				<h3>{cocktail?.name}</h3>
				<StyledImage
					src={cocktail?.image}
					alt={cocktail?.name}
					width="300%"
					height="300%"
				></StyledImage>
				<div>
					<p>ingredients:</p>
					{cocktail?.ingredients.names.map(name => {
						return <p key={nanoid()}>{name}</p>;
					})}
					<p>ingredients:</p>
					{cocktail?.ingredients.measurements.map(measurement => {
						return <p key={nanoid()}>{measurement}</p>;
					})}
				</div>
				<h4>Details:</h4>
				<p>{cocktail?.instructions}</p>
			</div>
		</Layout>
	);
};

export default Details;
