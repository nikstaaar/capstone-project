import useStore from '../hooks/useStore';

import {SearchBar, SearchContainer, SearchInput} from './styled/Search.styled';

export default function Search() {
	const setSearchItem = useStore(state => state.setSearchItem);
	const searchItem = useStore(state => state.searchItem);

	return (
		<SearchBar>
			<SearchContainer>
				<SearchInput
					value={searchItem}
					onChange={event => {
						event.preventDefault();
						const search = event.target.value;
						setSearchItem(search);
					}}
					type="search"
					name="search Ingredient"
					label="search Ingredients"
				/>
			</SearchContainer>
		</SearchBar>
	);
}
