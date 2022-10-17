import styled from 'styled-components';

export const MoreButton = styled.button`
	display: inline-block;
	position: fixed;
	top: ${props => props.top};
	right: 7%;
	width: 4.5em;
	height: 4.5em;
	padding: 5px 5px;
	border: none;
	border-radius: 400px;
	outline: none;
	background-color: #2d2826;
	color: white;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 2px;
	line-height: 1;
	text-align: center;
	text-transform: uppercase;
	white-space: normal;
	cursor: pointer; ;
`;
