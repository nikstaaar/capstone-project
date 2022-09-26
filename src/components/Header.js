import Link from 'next/link';

export default function Header() {
	return (
		<header>
			<nav>
				<Link href="/">Home</Link>
				<Link href="/about">About me</Link>
				<Link href="/bar">CLICK HERE !! my Bar !! CLICK HERE</Link>
			</nav>
		</header>
	);
}
