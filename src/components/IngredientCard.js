import {useSession} from 'next-auth/react';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import styled from 'styled-components';

import ingredientsStore from '../hooks/ingredientsStore';

import {DeleteButton} from './styled/DeleteButton.styled copy';
import {StyledIngredientCard} from './styled/IngredientCard.styled';
import {TextWrapper} from './styled/TextWrapper.styled';
import {StyledTitle} from './styled/Title.styled';

const StyledImage = styled(Image)`
	position: relative;
	top: 50%;
	border-radius: 0.55rem;
`;

export default function IngredientCard({ingredient}) {
	const savedIngredients = ingredientsStore(state => state.savedIngredients);
	const fetchSavedIngredients = ingredientsStore(state => state.fetchSavedIngredients);
	const [isExpanded, setIsExpanded] = useState(false);
	const {data: session} = useSession();
	const [newIngredients, setNewIngredients] = useState(savedIngredients);

	async function update(body) {
		await fetch(`/api/users/${session.user.email}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(body),
		});
	}
	function refreshPage() {
		window.location.reload(false);
	}
	useEffect(() => {
		update(newIngredients), fetchSavedIngredients(`/api/users/${session.user.email}`);
	}, [newIngredients]);

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
			<DeleteButton
				onClick={event => {
					event.stopPropagation(),
						setNewIngredients(
							savedIngredients.filter(newIngredients => newIngredients !== ingredient)
						),
						refreshPage();
				}}
			>
				X
			</DeleteButton>
			<StyledImage
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
