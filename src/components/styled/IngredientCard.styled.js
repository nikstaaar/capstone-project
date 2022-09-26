import styled from 'styled-components';

export const IngredientGrid = styled.ul`
	display: grid;
	grid-auto-rows: 190px;
	grid-column-gap: 15px;
	grid-row-gap: 15px;
	grid-template-columns: 33% 33% 33%;
	list-style: none;
`;

export const IngredientCard = styled.li`
	width: 100%;
	height: 190px;
	border-radius: 10px;
	opacity: ${props => props.opacity};
	background-color: ${props => props.color};
	${props =>
		props.mode &&
		props.saved &&
		`
         opacity: 50%
    `}
`;
