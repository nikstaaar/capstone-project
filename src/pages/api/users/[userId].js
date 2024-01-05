import {getUser, putUser} from '../../../backend/lib/controller';
import connectMongo from '../../../backend/lib/dbConnect';

export default async function handler(request, response) {
	try {
		await connectMongo();

		const {method} = request;
		switch (method) {
			case 'GET':
				getUser(request, response);
				break;
			case 'PUT':
				await updateUser(request, response);
				break;
			default:
				response.setHeader('Allow', ['GET', 'PUT', 'DEL']);
				response.status(405).end(`Method ${method} Not Allowed`);
		}
	} catch (error) {
		response.status(500).json({error: 'Internal Server Error'});
	}
}

async function updateUser(request, response) {
	try {
		const {userId} = request.query;
		const data = request.body;
		const filter = {email: userId};
		const update = {ingredients: data};

		await putUser(filter, update);
		response.status(200).json({message: 'User updated successfully'});
	} catch (error) {
		response.status(404).json({error: 'Error while updating the Data'});
	}
}
