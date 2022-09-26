import produce from 'immer';
import create from 'zustand';

const useStore = create((set, get) => ({
	fetchedData: [],
	searchItem: '',
	filteredIngredients: [],
	ingredients: [],
	setSearchItem: item => {
		set({searchItem: item});
	},
	setFilteredIngredients: newState => {
		set({filteredIngredients: newState});
	},
	updateIngredients: ingredient =>
		set(
			produce(draft => {
				const selectedIngredient = draft.ingredients.find(
					element => element._id === ingredient._id
				);
				selectedIngredient.saved = ingredient.saved;
			})
		),

	fetchSomething: async url => {
		try {
			const response = await fetch(url);
			const json = await response.json();
			const data = json.data;
			set({fetchedData: data});
			set({ingredients: get().fetchedData});
			set({filteredIngredients: get().fetchedData});
		} catch (error) {
			console.error(`Upps das war ein Fehler: ${error}`);
		}
	},
}));

export default useStore;
