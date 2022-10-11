import ingredientsStore from '../hooks/ingredientsStore';

import {SearchBar, SearchContainer, SearchInput} from './styled/Search.styled';

export default function Search() {
	const setSearchItem = ingredientsStore(state => state.setSearchItem);
	const searchItem = ingredientsStore(state => state.searchItem);

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
					name="search"
					label="search"
				/>
			</SearchContainer>
		</SearchBar>
	);
}
