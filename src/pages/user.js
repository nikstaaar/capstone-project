import {useSession} from 'next-auth/react';
import {signOut} from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';

import Layout from '../components/Layout';
import {AccountWrapper} from '../components/styled/AccountWrapper.styled';
import {StyledLogout} from '../components/styled/Login.styled';
export default function AboutPage() {
	const {data: session} = useSession();
	const StyledImage = styled(Image)`
		position: absolute;
		bottom: 10px;
		border-radius: 50%;
	`;

	return (
		<Layout>
			<Head>
				<title key="title">About</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<AccountWrapper>
				<StyledImage
					src={session?.user.image}
					alt="Profile Picture"
					width="200%"
					height="200%"
				></StyledImage>
				<p>{`name: ${session?.user.name}`}</p>
				<p>{`email: ${session?.user.email}`}</p>

				{session && (
					<>
						<StyledLogout onClick={() => signOut()}>Logout</StyledLogout>
					</>
				)}
			</AccountWrapper>
		</Layout>
	);
}
