import Image from 'next/image';
import {useState} from 'react';
import styled from 'styled-components';

import {StyledIngredientCard} from './styled/IngredientCard.styled';
import {TextWrapper} from './styled/TextWrapper.styled';
import {StyledTitle} from './styled/Title.styled';

const StyledImage = styled(Image)`
	position: relative;
	top: 50%;
	border-radius: 0.55rem;
`;

export default function IngredientCard({ingredient}) {
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<StyledIngredientCard
			onClick={() => {
				setIsExpanded(!isExpanded);
			}}
			key={ingredient._id}
			color={ingredient.color}
			expanded={isExpanded}
			transition={{layout: {duration: 1, type: 'spring'}}}
			layout
		>
			<StyledTitle layout="position" expanded={isExpanded}>
				{ingredient.name}
			</StyledTitle>

			<StyledImage
				src={ingredient.image}
				alt={ingredient.name}
				width="100px"
				height="147em"
			/>

			{isExpanded ? (
				<TextWrapper
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
