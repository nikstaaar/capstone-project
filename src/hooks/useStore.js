import create from 'zustand';

const useStore = create(set => ({
	fetchedData: null,
	handleData: data => {
		set({fetchedData: data});
	},
}));

export default useStore;
