import Image from 'next/image';
import {useState, useEffect} from 'react';
import styled from 'styled-components';

import ingredientsStore from '../hooks/ingredientsStore';

import {StyledButton} from './styled/Button.styled';
import {ImageWrapper} from './styled/ImageWrapper.styled';
import {StyledIngredientCard} from './styled/IngredientCard.styled';
import {TextWrapper} from './styled/TextWrapper.styled';
import {StyledTitle} from './styled/Title.styled';
import {TitleWrapper} from './styled/TitleWrapper.styled';

const StyledImage = styled(Image)`
	border-radius: 0.55rem;
`;

export default function SelectCard({ingredient}) {
	const savedIngredients = ingredientsStore(state => state.savedIngredients);

	const setMoreIngredients = ingredientsStore(state => state.setMoreIngredients);
	const addMoreIngredients = ingredientsStore(state => state.addMoreIngredients);
	const removeMoreIngredients = ingredientsStore(state => state.removeMoreIngredients);
	const moreIngredients = ingredientsStore(state => state.moreIngredients);

	const savedIngredientsNames = savedIngredients?.map(ingredient => ingredient.name);
	const saved = savedIngredientsNames?.includes(ingredient.name);
	const clicked = moreIngredients?.includes(ingredient._id);
	const [isSaved, setIsSaved] = useState(saved);
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		const savedIngredientsIds = savedIngredients?.map(ingredient => ingredient._id);
		setMoreIngredients(savedIngredientsIds);
	}, [savedIngredients, setMoreIngredients]);

	return (
		<StyledIngredientCard
			onClick={() => {
				setIsExpanded(!isExpanded);
			}}
			key={ingredient._id}
			color={ingredient.color}
			clicked={clicked ? true : undefined}
			expanded={isExpanded ? true : undefined}
			transition={{layout: {duration: 1, type: 'spring'}}}
			layout
		>
			<TitleWrapper>
				<StyledTitle expanded={isExpanded ? true : undefined}>
					{ingredient.name}
				</StyledTitle>
			</TitleWrapper>
			<ImageWrapper>
				<StyledImage
					layout="responsive"
					src={ingredient.image}
					alt={ingredient.name}
					width="100px"
					height="147px"
					quality={30}
					priority={true}
				/>
			</ImageWrapper>
			{!isSaved ? (
				<StyledButton
					expanded={isExpanded ? true : undefined}
					onClick={event => {
						event.stopPropagation();
						addMoreIngredients(moreIngredients, ingredient._id), setIsSaved(true);
					}}
				>
					save
				</StyledButton>
			) : (
				<StyledButton
					expanded={isExpanded ? true : undefined}
					saved={isSaved ? true : undefined}
					onClick={event => {
						event.stopPropagation();
						removeMoreIngredients(moreIngredients, ingredient._id), setIsSaved(false);
					}}
				>
					saved
				</StyledButton>
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
