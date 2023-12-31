import create from 'zustand';
import {persist} from 'zustand/middleware';

const cocktailsStore = create(
	persist(
		set => ({
			cocktails: [],

			fetchCocktails: async url => {
				try {
					const response = await fetch(url);
					const json = await response.json();
					const data = json.data;
					set({cocktails: data});
				} catch (error) {
					console.error(`Oops, there was an error: ${error}`);
				}
			},
		}),
		{
			name: 'cocktails-storage',
			getStorage: () => localStorage,
		}
	)
);

export default cocktailsStore;
