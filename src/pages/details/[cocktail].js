import {nanoid} from 'nanoid';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import {PageWrapper} from '../../components/styled/PageWrapper.styled';
import {Wrapper} from '../../components/styled/Wrapper.styled';
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

	const StyledImage = styled(Image)`
		border-radius: 0.45rem;
	`;
	return (
		<Layout>
			<Head>
				<title key="title">My Bar</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<PageWrapper>
				<h3>{cocktail?.name}</h3>
				<StyledImage
					src={cocktail?.image}
					alt={cocktail?.name}
					width="100%"
					height="150%"
				></StyledImage>
				<Wrapper>
					<div>
						<h4>Ingredients:</h4>
						{cocktail?.ingredients.names.map(name => {
							return <p key={nanoid()}>{name}</p>;
						})}
					</div>
					<div>
						<h4>Measurements:</h4>
						{cocktail?.ingredients.measurements.map(measurement => {
							return <p key={nanoid()}>{measurement}</p>;
						})}
					</div>
				</Wrapper>
				<h4>Details:</h4>
				<p>{cocktail?.instructions}</p>
				<Link href="/cocktails">
					<a>Back to cocktails</a>
				</Link>
			</PageWrapper>
		</Layout>
	);
};

export default Details;
