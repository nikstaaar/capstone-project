import mongoose, {Schema, model, models} from 'mongoose';

const userSchema = new Schema({
	name: String,
	userName: String,
	email: String,
	image: String,
	ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: 'ingredients'}],
	createdAt: String,
});

const User = models.user || model('user', userSchema);

export default User;
