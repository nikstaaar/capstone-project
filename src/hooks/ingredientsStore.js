import create from 'zustand';

const ingredientsStore = create(set => ({
	ingredients: [],
	savedIngredients: [],

	fetchIngredients: async url => {
		try {
			const response = await fetch(url);
			const json = await response.json();
			const data = json.data;
			set({ingredients: data});
		} catch (error) {
			console.error(`Upps das war ein Fehler: ${error}`);
		}
	},

	fetchSavedIngredients: async url => {
		try {
			const response = await fetch(url);
			const json = await response.json();
			const data = json[0].ingredients;
			set({savedIngredients: data});
		} catch (error) {
			console.error(`Upps das war ein Fehler: ${error}`);
		}
	},
}));
export default ingredientsStore;
