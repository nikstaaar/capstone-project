import {useSession, signIn, signOut} from 'next-auth/react';

const isPreview = process.env.VERCEL_ENV === 'preview';
import {CocktailsWrapper} from './styled/CocktailsWrapper.styled';
import {StyledLogin} from './styled/Login.styled';
export default function Login() {
	const {data: session} = useSession();

	if (session) {
		return (
			<>
				<CocktailsWrapper>
					<p>Welcome, {session.user.name}</p>
					Signed in as {session.user.email}
					<StyledLogin onClick={() => signOut()}>Logout</StyledLogin>
				</CocktailsWrapper>
			</>
		);
	}
	return (
		<>
			<CocktailsWrapper>
				Not signed in
				<StyledLogin
					onClick={() => {
						signIn(isPreview ? 'credentials' : 'github');
					}}
				>
					Login
				</StyledLogin>
			</CocktailsWrapper>
		</>
	);
}
