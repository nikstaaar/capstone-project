import Head from 'next/head';
import {useRouter} from 'next/router';

import Footer from './Footer';
import Header from './Header';
import SelectFooter from './SelectFooter';

export default function Layout({children}) {
	const router = useRouter();
	return (
		<>
			<Head>
				<title key="title">My Bar</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<Header />
			<main>{children}</main>
			{router.pathname === '/select' ? <SelectFooter /> : <Footer />}
		</>
	);
}
