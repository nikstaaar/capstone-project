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
			try {
				await putUser(request, response);

				response.status(200).json({method, name: 'PUT Request'});
			} catch (error) {
				response.status(500).json({error: 'Error processing PUT request'});
			}
			break;
	}
}
