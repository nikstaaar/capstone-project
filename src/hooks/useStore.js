import create from 'zustand';

const useStore = create(set => ({
	fetchedData: [],
	filteredIngredients: [],
	setFilteredIngredients: newState => {
		set({filteredIngredients: newState});
	},
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
