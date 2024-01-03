import create from 'zustand';
import {persist} from 'zustand/middleware';

const useIngredientsStore = create(
	persist(
		set => ({
			ingredients: [],
			savedIngredients: [],
			searchItem: [],
			moreIngredients: [],
			setMoreIngredients: state => {
				set({moreIngredients: state});
			},
			removeMoreIngredients: (ingredients, ingredient) => {
				set({
					moreIngredients: ingredients.filter(item => item !== ingredient),
				});
			},
			addMoreIngredients: (ingredients, ingredient) => {
				if (ingredients) {
					set({moreIngredients: [...ingredients, ingredient]});
				} else set({moreIngredients: ingredient});
			},
			setSearchItem: item => {
				set({searchItem: item});
			},
			setSavedIngredients: ingredients => {
				set({savedIngredients: ingredients});
			},
			fetchIngredients: async url => {
				try {
					const response = await fetch(url);
					const json = await response.json();
					const data = json.data;
					set({ingredients: data});
					console.log('fetchIngredients success');
				} catch (error) {
					console.error(`Oops, there was an error: ${error}`);
				}
			},
			fetchSavedIngredients: async url => {
				try {
					const response = await fetch(url);
					const json = await response.json();
					const data = json[0].ingredients;
					set({savedIngredients: data});
					console.log('fetchSavedIngredients success');
				} catch (error) {
					console.error(`Oops, there was an error: ${error}`);
				}
			},
		}),
		{
			name: 'ingredients-storage',
			getStorage: () => localStorage,
			whitelist: ['ingredients'],
		}
	)
);

export default useIngredientsStore;
