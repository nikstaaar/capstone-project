import dbConnect from '../../backend/lib/dbConnect';
import Ingredient from '../../backend/models/ingredientsModel';

export default async function Handler(request, response) {
	try {
		await dbConnect();
		switch (request.method) {
			case 'GET': {
				const ingredients = await Ingredient.find({});
				response.status(200).json({success: true, data: ingredients});
				break;
			}

			case 'POST': {
				const ingredient = await Ingredient.create(request.body);
				response.status(201).json({success: true, data: ingredient});
				break;
			}
		}
	} catch (error) {
		response.status(500).json({error: 'Internal Server Error'});
	}
}
