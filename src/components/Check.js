import {useState} from 'react';

import ingredientsStore from '../hooks/ingredientsStore';

export default function Check({saved, ingredient}) {
	const [isSaved, setIsSaved] = useState(saved);
	const addMoreIngredients = ingredientsStore(state => state.addMoreIngredients);
	const removeMoreIngredients = ingredientsStore(state => state.removeMoreIngredients);
	const moreIngredients = ingredientsStore(state => state.moreIngredients);

	return !isSaved ? (
		<button
			onClick={() => {
				addMoreIngredients(moreIngredients, ingredient), setIsSaved(true);
			}}
		>
			save this ingredient
		</button>
	) : (
		<button
			onClick={() => {
				removeMoreIngredients(moreIngredients, ingredient), setIsSaved(false);
			}}
		>
			saved
		</button>
	);
}
