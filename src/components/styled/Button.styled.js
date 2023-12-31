import styled from 'styled-components';

export const StyledButton = styled.button`
	display: inline-block;
	position: absolute;
	width: 70px;
	height: 10px;
	padding: 5px 5px 18px;
	border: 1px solid;
	border-radius: 400px;
	border-color: white;
	outline: none;
	background-color: black;
	color: white;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 2px;
	line-height: 1;
	text-align: center;
	text-transform: uppercase;
	white-space: normal;
	cursor: pointer;
	${({saved}) =>
		saved
			? `background-color: hsla(0, 0%, 0%, 0);
	color: black;
	border-color: black;`
			: ''};
	${({expanded}) =>
		expanded
			? `
			top: 5px;
			right: 5px;`
			: `	bottom: 5px;
				right 15.5%`};
`;
