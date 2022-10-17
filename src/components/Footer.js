import Link from 'next/link';

import {LinkWrapper} from './styled/LinkWrapper.styled';
import {StyledNav} from './styled/Nav.styled';
export default function Footer(request) {
	const page = request.query;
	{
		console.log(page);
	}
	return (
		<footer>
			<StyledNav>
				<LinkWrapper>
					<Link href="/bar">
						<h4>My Bar</h4>
					</Link>
				</LinkWrapper>
				<LinkWrapper>
					<Link href="/cocktails">
						<h4>Cocktails</h4>
					</Link>
				</LinkWrapper>
				<LinkWrapper>
					<Link href="/user">
						<h4>Account</h4>
					</Link>
				</LinkWrapper>
			</StyledNav>
		</footer>
	);
}
