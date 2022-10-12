//import {useState} from 'react';

import {StyledIngredientCard} from './styled/IngredientCard.styled';
export default function IngredientCard({ingredient}) {
	//const [isExpanded, setIsExpanded] = useState(false);
	return (
		<StyledIngredientCard
			//onClick={setIsExpanded(true)}
			key={ingredient._id}
			color={ingredient.color}
		>
			<p>{ingredient.name}</p>
		</StyledIngredientCard>
	);
}
