import Image from 'next/image';
import {useState} from 'react';
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
	cursor: pointer;
`;

export default function SelectCard({ingredient}) {
	const addMoreIngredients = ingredientsStore(state => state.addMoreIngredients);
	const removeMoreIngredients = ingredientsStore(state => state.removeMoreIngredients);
	const moreIngredients = ingredientsStore(state => state.moreIngredients);

	const clicked = moreIngredients?.includes(ingredient._id);

	const [isExpanded, setIsExpanded] = useState(false);

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
			<StyledButton
				expanded={isExpanded ? true : undefined}
				onClick={event => {
					event.stopPropagation();
					if (!clicked) {
						addMoreIngredients(moreIngredients, ingredient._id);
					} else {
						removeMoreIngredients(moreIngredients, ingredient._id);
					}
				}}
			>
				{clicked ? 'saved' : 'save'}
			</StyledButton>
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
