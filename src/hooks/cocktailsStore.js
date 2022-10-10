import create from 'zustand';

const cocktailsStore = create(set => ({
	cocktails: [],

	fetchCocktails: async url => {
		try {
			const response = await fetch(url);
			const json = await response.json();
			const data = json.data;
			set({cocktails: data});
		} catch (error) {
			console.error(`Upps das war ein Fehler: ${error}`);
		}
	},
}));
export default cocktailsStore;
