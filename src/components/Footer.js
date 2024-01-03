import Link from 'next/link';
import styled from 'styled-components';

import {LinkWrapper} from './styled/LinkWrapper.styled';
import {StyledNav} from './styled/Nav.styled';

export default function Footer() {
	const StyledLink = styled.a`
		color: black;
		font-weight: 600;
		cursor: pointer;
	`;

	return (
		<footer>
			<StyledNav>
				<LinkWrapper>
					<Link href="/bar">
						<StyledLink>My Bar</StyledLink>
					</Link>
				</LinkWrapper>
				<LinkWrapper>
					<Link href="/cocktails">
						<StyledLink>Cocktails</StyledLink>
					</Link>
				</LinkWrapper>
				<LinkWrapper>
					<Link href="/user">
						<StyledLink>User</StyledLink>
					</Link>
				</LinkWrapper>
			</StyledNav>
		</footer>
	);
}
