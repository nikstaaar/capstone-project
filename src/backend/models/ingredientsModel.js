import {Schema, model, models} from 'mongoose';

const ingredientsSchema = new Schema({
	name: String,
	color: String,
	saved: Boolean,
});

const Ingredient = models.Ingredients || model('Ingredient', ingredientsSchema);

export default Ingredient;
