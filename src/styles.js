import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
		margin: 0;
	}

	html {
		font-size: 16px;
	}

	body {
		margin: 0;
		background-color: #F7DDA4;
		font-size: 1rem;
}
`;
