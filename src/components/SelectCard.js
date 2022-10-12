import {useSession} from 'next-auth/react';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import styled from 'styled-components';

import ingredientsStore from '../hooks/ingredientsStore';

import {StyledIngredientCard} from './styled/IngredientCard.styled';
import {TextWrapper} from './styled/TextWrapper.styled';
import {StyledTitle} from './styled/Title.styled';

const StyledImage = styled(Image)`
	position: relative;
	top: 50%;
	border-radius: 0.55rem;
`;

export default function SelectCard({ingredient}) {
	const {data: session} = useSession();
	const savedIngredients = ingredientsStore(state => state.savedIngredients);
	const fetchSavedIngredients = ingredientsStore(state => state.fetchSavedIngredients);
	const setMoreIngredients = ingredientsStore(state => state.setMoreIngredients);
	const savedIngredientsNames = savedIngredients?.map(ingredient => ingredient.name);
	const addMoreIngredients = ingredientsStore(state => state.addMoreIngredients);
	const removeMoreIngredients = ingredientsStore(state => state.removeMoreIngredients);
	const moreIngredients = ingredientsStore(state => state.moreIngredients);
	const saved = savedIngredientsNames?.includes(ingredient.name);
	const clicked = moreIngredients?.includes(ingredient._id);
	const [isSaved, setIsSaved] = useState(saved);
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		if (session) {
			fetchSavedIngredients(`/api/users/${session.user.email}`);
			const savedIngredientsIds = savedIngredients?.map(ingredient => ingredient._id);
			setMoreIngredients(savedIngredientsIds);
		}
	}, [fetchSavedIngredients, session]);

	return (
		<StyledIngredientCard
			onClick={() => {
				setIsExpanded(!isExpanded);
			}}
			key={ingredient._id}
			color={ingredient.color}
			clicked={clicked}
			expanded={isExpanded}
			transition={{layout: {duration: 1, type: 'spring'}}}
			layout
		>
			<StyledTitle expanded={isExpanded}>{ingredient.name}</StyledTitle>
			<StyledImage
				src="https://source.unsplash.com/yU9TNvk_jI8/w=600"
				alt="image"
				width="100px"
				height="147em"
			/>
			{!isSaved ? (
				<button
					onClick={event => {
						event.stopPropagation();
						addMoreIngredients(moreIngredients, ingredient._id), setIsSaved(true);
					}}
				>
					save this ingredient
				</button>
			) : (
				<button
					onClick={event => {
						event.stopPropagation();
						removeMoreIngredients(moreIngredients, ingredient._id), setIsSaved(false);
					}}
				>
					saved
				</button>
			)}
			{isExpanded ? (
				<TextWrapper
					key={ingredient.name}
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{duration: 1}}
				>
					<p>{ingredient.description}</p>
				</TextWrapper>
			) : undefined}
		</StyledIngredientCard>
	);
}
