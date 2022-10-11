import mongoose, {Schema, model, models} from 'mongoose';

import './ingredientsModel';

const userSchema = new Schema({
	name: String,
	userName: String,
	email: String,
	image: String,
	ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredients'}],
	createdAt: String,
});

const User = models.user || model('user', userSchema);

export default User;
