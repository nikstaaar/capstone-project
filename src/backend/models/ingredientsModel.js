import {Schema, model, models} from 'mongoose';

const ingredientsSchema = new Schema({
	name: String,
	color: String,
	saved: Boolean,
});

const Ingredients = models.Ingredients || model('Ingredients', ingredientsSchema);

export default Ingredients;
