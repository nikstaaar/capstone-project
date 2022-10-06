import {Schema, model, models} from 'mongoose';

const userSchema = new Schema({
	name: String,
	userName: String,
	email: String,
	image: String,
	ingredients: [String],
	createdAt: String,
});

const User = models.user || model('user', userSchema);

export default User;
