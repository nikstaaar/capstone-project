import Head from 'next/head';

import Login from '../components/Login';

export default function HomePage() {
	return (
		<>
			<Head>
				<title key="title">My Project</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			<video
				autoPlay
				loop
				muted
				style={{position: 'absolute', objectFit: 'fill', width: '100%', height: '100%'}}
				type="video/mp4"
			>
				<source src="/loginbg.mp4"></source>
			</video>
			<Login />
		</>
	);
}
