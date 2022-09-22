import produce from 'immer';
import create from 'zustand';

const useStore = create(set => ({
	fetchedData: [],
	filteredIngredients: [],
	setFilteredIngredients: newState => {
		set({filteredIngredients: newState});

		console.log(newState);
	},
	updateIngredients: ingredient =>
		set(
			produce(draft => {
				const selectedIngredient = draft.filteredIngredients.find(
					element => element._id === ingredient._id
				);
				selectedIngredient.saved = ingredient.saved;
				console.log(selectedIngredient);
			})
		),
	fetchSomething: async url => {
		try {
			const response = await fetch(url);
			const json = await response.json();
			const data = json.data;
			set({fetchedData: data});
			set({filteredIngredients: data});
		} catch (error) {
			console.error(`Upps das war ein Fehler: ${error}`);
		}
	},
}));

export default useStore;
