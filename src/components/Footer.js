import Link from 'next/link';
import {useRouter} from 'next/router';
import styled from 'styled-components';

import {StyledNav} from './styled/Nav.styled';

export default function Footer() {
	const router = useRouter();

	const StyledLink = styled.a`
		color: ${props => (props.isActive ? '#f7dda4' : 'black')};
		font-weight: 600;
		cursor: pointer;
	`;

	const LinkWrapper = styled.div`
		display: flex;
		align-items: center;
		justify-content: center;
		width: 5rem;
		height: 100%;
		background-color: ${props => (props.isActive ? 'black' : '')};
	`;

	return (
		<footer>
			<StyledNav>
				<LinkWrapper isActive={router.pathname === '/bar' || router.pathname === '/select'}>
					<Link href="/bar">
						<StyledLink
							isActive={router.pathname === '/bar' || router.pathname === '/select'}
						>
							My Bar
						</StyledLink>
					</Link>
				</LinkWrapper>
				<LinkWrapper
					isActive={
						router.pathname === '/cocktails' || router.pathname.startsWith('/details/')
					}
				>
					<Link href="/cocktails">
						<StyledLink
							isActive={
								router.pathname === '/cocktails' ||
								router.pathname.startsWith('/details/')
							}
						>
							Cocktails
						</StyledLink>
					</Link>
				</LinkWrapper>
				<LinkWrapper isActive={router.pathname === '/user'}>
					<Link href="/user">
						<StyledLink isActive={router.pathname === '/user'}>User</StyledLink>
					</Link>
				</LinkWrapper>
			</StyledNav>
		</footer>
	);
}
