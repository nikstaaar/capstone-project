import styled from 'styled-components';

export const IngredientCard = styled.li`
	width: 100%;
	height: 190px;
	border-radius: 10px;
	opacity: ${props => props.opacity};
	background-color: ${props => props.color};
	${props =>
		props.mode &&
		`
         opacity: 100%
    `}
`;
