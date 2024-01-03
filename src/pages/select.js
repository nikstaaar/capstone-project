import {useEffect} from 'react';

import Layout from '../components/Layout';
import Search from '../components/Search';
import SelectCard from '../components/SelectCard';
import {StyledIngredientGrid} from '../components/styled/IngredientCard.styled';
import ingredientsStore from '../hooks/ingredientsStore';
import useStore from '../hooks/useStore';

export default function BarPage() {
	const ingredients = useStore(ingredientsStore, state => state.ingredients);
	const searchItem = ingredientsStore(state => state.searchItem);
	const setSearchItem = ingredientsStore(state => state.setSearchItem);
	const savedIngredients = ingredientsStore(state => state.savedIngredients);
	const setMoreIngredients = ingredientsStore(state => state.setMoreIngredients);

	useEffect(() => {
		setSearchItem('');
	}, [setSearchItem]);

	useEffect(() => {
		const savedIngredientsIds = savedIngredients?.map(ingredient => ingredient._id);
		setMoreIngredients(savedIngredientsIds);
	}, [savedIngredients, setMoreIngredients]);

	return (
		<Layout>
			<Search />
			<StyledIngredientGrid>
				{ingredients?.map(ingredient => {
					const searchQuery = searchItem.toString().toLowerCase();
					const ingredientName = ingredient.name.toLowerCase();
					if (ingredientName.startsWith(searchQuery)) {
						return (
							<SelectCard key={ingredient._id} ingredient={ingredient}></SelectCard>
						);
					} else return null;
				})}
			</StyledIngredientGrid>
		</Layout>
	);
}
