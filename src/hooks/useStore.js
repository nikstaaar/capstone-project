import create from 'zustand';

const useStore = create(set => ({
	fetchedData: {results: []},
	fetchSomething: async url => {
		try {
			const response = await fetch(url);
			const data = await response.json();
			set({fetchedData: data});
		} catch (error) {
			console.error(`Upps das war ein Fehler: ${error}`);
		}
	},
}));

export default useStore;
