import {Schema, model, models} from 'mongoose';

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
	},
	ingredients: {
		type: [String],
		default: [],
	},
	hashedPassword: {
		type: String,
		required: true,
		minlength: 5,
	},
	image: String,
});

const User = models.User || model('User', userSchema);

export default User;
