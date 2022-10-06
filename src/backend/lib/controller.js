import User from '../models/userModel';

export async function getUser(request, response) {
	try {
		const {userId} = request.query;
		if (userId) {
			const user = await User.findById(userId);
			response.status(200).json(user);
		}
		response.status(404).json({error: 'User not selected'});
	} catch {
		response.status(404).json({error: 'Cannot get the User'});
	}
}

export async function putUser(request, response) {
	try {
		const {userId} = request.query;
		const data = request.body;
		if (userId && data) {
			await User.findByIdAndUpdate(userId, data);
			response.status(200).json(data);
		}
		response.status(404).json({error: 'User not selected.'});
	} catch (error) {
		response.status(404).json({error: 'Error while updating the Data'});
	}
}
