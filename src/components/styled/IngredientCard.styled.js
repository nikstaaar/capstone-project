import {motion} from 'framer-motion';
import styled from 'styled-components';

export const StyledIngredientGrid = styled.ul`
	display: grid;
	grid-auto-flow: dense;
	grid-auto-rows: 190px;
	grid-column-gap: 15px;
	grid-row-gap: 15px;
	grid-template-columns: repeat(auto-fit, minmax(80px, 100px));
	list-style: none;
`;

export const StyledIngredientCard = styled(motion.li)`
	width: 100%;
	border-radius: 0.55rem;
	background-color: ${props => props.color};
	${({expanded}) =>
		expanded
			? `
		padding: 1em;
		grid-column: auto / span 2;
		grid-row: auto / span 2;
  `
			: `padding: 0.4em`};
	${({clicked}) =>
		clicked &&
		`	border-style: solid;
  			border-color: black;
			opacity: 60%
  `}
`;
