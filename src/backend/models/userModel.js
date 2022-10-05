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
		default: [
			'632d69f7244ea4c1577e2c64',
			'633de007084435029dd87e24',
			'632ae9c6181d90945822dc24',
		],
	},
	image: String,
});

const User = models.User || model('User', userSchema);

export default User;
