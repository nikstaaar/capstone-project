import {Schema, model, models} from 'mongoose';

const ingredientsSchema = new Schema({
	name: String,
	alternatives: Array,
	description: String,
	alcoholic: Boolean,
	color: String,
	image: String,
});

const Ingredients = models.Ingredients || model('Ingredients', ingredientsSchema);

export default Ingredients;
