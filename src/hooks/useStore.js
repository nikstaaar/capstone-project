import produce from 'immer';
import create from 'zustand';

const useStore = create((set, get) => ({
	fetchedIData: [],
	fetchedCData: [],
	searchItem: '',
	filteredIngredients: [],
	ingredients: [],
	cocktails: [],
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

	fetchCocktails: async url => {
		try {
			const response = await fetch(url);
			const json = await response.json();
			const data = json.data;
			set({fetchedCData: data});
			set({cocktails: get().fetchedCData});
		} catch (error) {
			console.error(`Upps das war ein Fehler: ${error}`);
		}
	},

	fetchIngredients: async url => {
		try {
			const response = await fetch(url);
			const json = await response.json();
			const data = json.data;
			set({fetchedIData: data});
			set({ingredients: get().fetchedIData});
			set({filteredIngredients: get().fetchedIData});
		} catch (error) {
			console.error(`Upps das war ein Fehler: ${error}`);
		}
	},
}));
export default useStore;
