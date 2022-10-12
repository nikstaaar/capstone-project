import styled from 'styled-components';

export const StyledIngredientGrid = styled.ul`
	display: grid;
	grid-auto-rows: 190px;
	grid-column-gap: 15px;
	grid-row-gap: 15px;
	grid-template-columns: 33% 33% 33%;
	list-style: none;
`;

export const StyledIngredientCard = styled.li`
	width: 100%;
	height: 190px;
	border-radius: 10px;
	background-color: ${props => props.color};
`;
