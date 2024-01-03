import {useSession} from 'next-auth/react';
import Image from 'next/image';
import {useState} from 'react';
import styled from 'styled-components';

import ingredientsStore from '../hooks/ingredientsStore';

import {DeleteButton} from './styled/DeleteButton.styled copy';
import {ImageWrapper} from './styled/ImageWrapper.styled';
import {StyledIngredientCard} from './styled/IngredientCard.styled';
import {TextWrapper} from './styled/TextWrapper.styled';
import {StyledTitle} from './styled/Title.styled';
import {TitleWrapper} from './styled/TitleWrapper.styled';

export default function IngredientCard({ingredient}) {
	const savedIngredients = ingredientsStore(state => state.savedIngredients);
	const setSavedIngredients = ingredientsStore(state => state.setSavedIngredients);
	const [isExpanded, setIsExpanded] = useState(false);
	const {data: session} = useSession();

	async function update() {
		const newIngredients = savedIngredients.filter(
			newIngredients => newIngredients !== ingredient
		);
		setSavedIngredients(newIngredients);
		await fetch(`/api/users/${session.user.email}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(newIngredients),
		});
	}

	const StyledImage = styled(Image)`
		border-radius: 0.55em;
		cursor: pointer;
	`;

	return (
		<StyledIngredientCard
			onClick={() => {
				setIsExpanded(!isExpanded);
			}}
			key={ingredient._id}
			color={ingredient.color}
			expanded={isExpanded ? true : undefined}
			transition={{layout: {duration: 1, type: 'spring'}}}
			layout
		>
			<TitleWrapper>
				<StyledTitle layout="position" expanded={isExpanded ? true : undefined}>
					{ingredient.name}
				</StyledTitle>
			</TitleWrapper>
			<DeleteButton
				onClick={event => {
					event.stopPropagation(), update();
				}}
			>
				X
			</DeleteButton>
			<ImageWrapper>
				<StyledImage
					layout="responsive"
					src={ingredient.image}
					alt={ingredient.name}
					width="100px"
					height="147px"
				/>
			</ImageWrapper>
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
