import {motion} from 'framer-motion';
import styled from 'styled-components';

export const StyledIngredientGrid = styled.ul`
	display: grid;
	grid-auto-flow: dense;
	grid-auto-rows: 190px;
	grid-column-gap: 15px;
	grid-row-gap: 15px;
	grid-template-columns: repeat(auto-fit, minmax(100px, 100px));
	align-self: center;
	width: 100%;
	padding-right: 2%;
	padding-left: 6%;
	list-style: none;
`;

export const StyledIngredientCard = styled(motion.li)`
	display: flex;
	position: relative;
	flex-direction: column;
	width: 100%;
	row-gap: 10px;
	border-radius: 0.55rem;
	background-color: ${props => props.color};
	${({expanded}) =>
		expanded
			? `
		padding: 1em;
		grid-column: auto / span 2;
		grid-row: auto / span 3;`
			: `padding: 0.4em`};
	${({clicked}) =>
		clicked
			? `	
		border-style: solid;
  		border-color: black;
		opacity: 60%`
			: ''}
`;
