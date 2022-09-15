import create from 'zustand';

const useStore = create(set => ({
	counter: 0,
	setCounter(counter) {
		set({counter});
	},
	decrementCounter(step = 1) {
		set(({counter}) => ({counter: counter - step}));
	},
	incrementCounter(step = 1) {
		set(({counter}) => ({counter: counter + step}));
	},
}));

export default useStore;
