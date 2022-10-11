const ingredientNames = [
	'Gin',
	'Grand Marnier',
	'Triple+Sec',
	'Cointreau',
	'Lemon juice',
	'Grenadine',
	'Amaretto',
	'Baileys',
	'Cognac',
	'Creme',
	'Milk',
	'Egg White',
	'Dark Rum',
	'Lemon Juice',
	'Vodka',
	'Tonic Water',
	'Applejack',
	'Calvados',
	'Grapefruit Juice',
	'Strawberry Schnapps',
	'Orange Juice',
	'Cranberry Juice',
	'Club+Soda',
	'Apple+Juice',
	'Maraschino+Cherry',
	'Pisang+Ambon',
	'Lemonade',
	'Peach+Nectar',
	'Kahlua',
	'Dry+Vermouth',
	'Sweet+Vermouth',
	'Bianco+Vermouth',
	'White Rum',
	'Lime+Juice',
	'Sugar',
	'Mint',
	'Scotch',
	'Orange Bitters',
	'Maraschino Liqueur',
	'Creme de Cacao',
	'Nutmeg',
	'Rye Whiskey',
	'Pineapple Juice',
	'Bourbon',
	'Blackberry+Brandy',
	'Lemon Peel',
	'Angostura+Bitters',
	'Frangelico',
	'Coffee',
	'Creme+de+Banane',
	'Sambuca',
	'Green+Chartreuse',
	'Goldschlager',
	'Champagne',
	'Simple+Syrup',
	'Creme+de Mure',
	'Blue+Curacao',
	'Passion+Fruit+Juice',
	'Galliano',
	'Prosecco',
	'Cherry+Heering',
	'Hot+Chocolate',
	'Sloe+Gin',
	'Midori',
	'Jägermeister',
	'Tomato+Juice',
	'Worcestershire+Sauce',
	'Tabasco',
	'Cocktail+Cherry',
	'Powdered+Sugar',
	'Cachaca',
	'Coca-Cola',
	'Brandy',
	'Spiced+Rum',
	'Ginger+Ale',
	'Falernum',
	'Vanilla',
	'Lager',
	'Campari',
	'Cranberry+Juice',
	'Egg+Yolk',
	'Lillet+Blanc',
	'Absinthe',
	'Peach+Bitters',
	'Port',
	'Olive',
	'Olive Brine',
	'Demerara+Sugar',
	'St. Germain',
	'Pisco',
	'Pineapple+Syrup',
	'Lavender',
	'Ginger+Beer',
	'Chocolate+Syrup',
	'Sugar',
	'Whipped+Cream',
	'Vanilla+Syrup',
	'Espresso',
	'Apricot+Brandy',
	'Elderflower+Syrup',
	'Salt',
	'Strawberries',
	'Rosé',
	'Benedictine',
	'Thyme',
	'Honey+Syrup',
	'Orange+Peel',
	'Pineapple',
	'Rose+Water',
	'Lemon',
	'Green+Creme+de+Menthe',
	'Cinnamon',
	'Cloves',
	'Blackberries',
	'Irish+whiskey',
	'Guinness',
	'Aperol',
	'Yellow+Chartreuse',
	'Apple+Brandy',
	'Creme+de+Cassis',
	'Drambuie',
	'Tequila',
	'Orgeat+Syrup',
	'Creme+of+Coconut',
	'Red+Wine',
	'White+Creme+de+Menthe',
	'Vodka+Citron',
	'Dry+Curacao',
	'Malibu',
	'Islay+Scotch',
	'Ginger Syrup',
	'Passoa',
	'Raspberry+Syrup',
	'Rosemary',
	'Cognac',
	'Amaro+Montenegro',
	'Amaro+Nonino',
	'Sherry',
	'Rosemary+Syrup',
	'Agave+Syrup',
];

import connectMongo from '../../backend/lib/dbConnect';
import Ingredients from '../../backend/models/ingredientsModel';

export default async function handler(request, response) {
	const rawData = await Promise.all(
		ingredientNames.map(async ingredient => {
			const result = await fetch(
				`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient}`
			);
			const data = await result.json();
			return data;
		})
	);
	const ingredientsByName = rawData.map(object => object.ingredients).flat();
	const ingredients = ingredientsByName.map(ingredient => {
		const name = ingredient?.strIngredient || 'no description';
		const description = ingredient?.strDescription || 'no description';
		const alcoholic = Boolean(ingredient?.strAlcohol);

		return {
			name: name,
			description: description,
			alcoholic: alcoholic,
			color: '#add8e6',
			image: 'Empty',
		};
	});
	try {
		await connectMongo();

		switch (request.method) {
			case 'GET': {
				response.status(200).json(ingredients);
				break;
			}

			case 'POST': {
				const data_ = await Ingredients.insertMany(request.body);
				response.status(200).json(data_);
				break;
			}
		}
	} catch (error) {
		response.status(500).json({error: 'Internal Server Error'});
	}
}
