import Link from 'next/link';

export default function Footer() {
	return (
		<footer>
			<nav>
				<Link href="/">Home</Link>
				<Link href="/about">About me</Link>
				<Link href="/bar">CLICK HERE !! my Bar !! CLICK HERE</Link>
			</nav>
			<div>© 2022 by Me</div>
		</footer>
	);
}
