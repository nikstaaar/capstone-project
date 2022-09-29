const numbers = Array.from({length: 26}).map((_, i) => {
	return i + 97;
});
const alphabet = numbers.map(number => String.fromCharCode(number));

const ingredientPrefix = 'strIngredient';
const ingredientCount = 15;
const ingredientKeys = Array.from({length: ingredientCount}).map((_, index) => {
	return `${ingredientPrefix}${index + 1}`;
});

const measurementPrefix = 'strMeasure';
const measureKeys = Array.from({length: 15}).map((_, index) => {
	return `${measurementPrefix}${index + 1}`;
});

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
	const drinks = drinksA_Z.flat(1).filter(drink => drink !== null);

	const cocktails = drinks.map(drink => {
		const nullIngredients = ingredientKeys.map(key => {
			return drink[key];
		});
		const nullMeasurements = measureKeys.map(key => {
			return drink[key];
		});
		const ingredients = nullIngredients.filter(ingredient => ingredient !== null);
		const measurements = nullMeasurements.filter(measurement => measurement !== null);
		return {
			id: drink.idDrink,
			name: drink.strDrink,
			ingredients: {
				names: ingredients,
				measurements: measurements,
			},
			instructions: drink.strInstructions,
			image: drink.strDrinkThumb,
		};
	});

	response.status(200).json({success: true, data: cocktails});
}
