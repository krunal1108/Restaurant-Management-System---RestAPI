import mongoose from "mongoose";

const ingredientsSchema = new mongoose.Schema({
    ingredient_name: {
        type: String,
        required: true
    },
    ingredientTypes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ingredientType',
        required: true
    }
});


const ingredientsAll = mongoose.model('ingredients', ingredientsSchema);
export default ingredientsAll;