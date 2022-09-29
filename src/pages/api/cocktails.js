const numbers = Array.from({length: 26}).map((_, i) => {
	return i + 97;
});
const alphabet = numbers.map(number => String.fromCharCode(number));

export default async function handler(request, response) {
	const objects = await Promise.all(
		alphabet.map(async letter => {
			const result = await fetch(
				`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
			);
			const data = await result.json();
			return data;
		})
	);
	const drinksA_Z = objects.map(object => object.drinks);
	const drinks = drinksA_Z.flat(1);

	drinks.map(drink => {
		console.log(drink);
	});

	response.status(200).json(drinks);
}
