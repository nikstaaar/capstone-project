import {useSession} from 'next-auth/react';
import Image from 'next/image';
import {useState} from 'react';
import styled from 'styled-components';

import ingredientsStore from '../hooks/ingredientsStore';

import {DeleteButton} from './styled/DeleteButton.styled copy';
import {StyledIngredientCard} from './styled/IngredientCard.styled';
import {TextWrapper} from './styled/TextWrapper.styled';
import {StyledTitle} from './styled/Title.styled';
import {TitleWrapper} from './styled/TitleWrapper.styled';

export default function IngredientCard({ingredient}) {
	const savedIngredients = ingredientsStore(state => state.savedIngredients);
	const [isExpanded, setIsExpanded] = useState(false);
	const {data: session} = useSession();
	const newIngredients = savedIngredients.filter(newIngredients => newIngredients !== ingredient);

	async function update() {
		await fetch(`/api/users/${session.user.email}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(newIngredients),
		});
	}
	function refreshPage() {
		window.location.reload(false);
	}
	const StyledImage = styled(Image)`
		border-radius: 0.55em;
	`;
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
			<TitleWrapper>
				<StyledTitle layout="position" expanded={isExpanded}>
					{ingredient.name}
				</StyledTitle>
			</TitleWrapper>
			<DeleteButton
				onClick={event => {
					event.stopPropagation(), update();
					refreshPage();
				}}
			>
				X
			</DeleteButton>

			<StyledImage
				layout="responsive"
				src={ingredient.image}
				alt={ingredient.name}
				width="100px"
				height="147px"
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
