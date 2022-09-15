import {nanoid} from 'nanoid';
import Head from 'next/head';
import {useState} from 'react';

import Button from '../components/Button';
import Layout from '../components/Layout';
import useFetch from '../hooks/useFetch';
import useStore from '../hooks/useStore';

export default function HomePage() {
	// Data
	const {data, loading, error} = useFetch('/api/hello');

	// Local state
	const [id, setId] = useState(null);

	// Global state
	const counter = useStore(state => state.counter);
	const decrementCounter = useStore(state => state.decrementCounter);
	const incrementCounter = useStore(state => state.incrementCounter);
	const setCounter = useStore(state => state.setCounter);

	return (
		<Layout>
			<Head>
				<title key="title">My Project</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			<h1>Home</h1>
			{loading && <div>Loading...</div>}
			{error && <div>{error.message}</div>}
			{data && (
				<pre>
					<code>{JSON.stringify(data, null, 4)}</code>
				</pre>
			)}
			<section>
				<Button
					aria-label="decrement"
					onClick={() => {
						decrementCounter();
					}}
				>
					-
				</Button>
				<input
					value={`${counter}`}
					size={2}
					onChange={event => {
						setCounter(Number.parseInt(event.target.value, 10));
					}}
				/>
				<Button
					aria-label="increment"
					onClick={() => {
						incrementCounter();
					}}
				>
					+
				</Button>
			</section>
			<br />
			<section>
				<Button
					onClick={() => {
						setId(nanoid());
					}}
				>
					Generate ID
				</Button>
				<br />
				<div>Id: {id}</div>
			</section>
		</Layout>
	);
}
