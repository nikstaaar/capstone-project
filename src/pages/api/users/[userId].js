import {getUser, putUser} from '../../../backend/lib/controller';
import connectMongo from '../../../backend/lib/dbConnect';

export default async function handler(request, response) {
	connectMongo().catch(() => response.status(405).json({error: 'Error in the Connection'}));
	const {method} = request;
	switch (method) {
		case 'GET':
			getUser(request, response);
			break;
		case 'PUT':
			await putUser(request, response);
			response.status(200).json({method, name: 'PUT Request'});
			break;
		default:
			response.setHeader('Allow', ['GET', 'PUT', 'DEL']);
			response.status(405).end(`Method${method} Not Allowed`);
	}
}
