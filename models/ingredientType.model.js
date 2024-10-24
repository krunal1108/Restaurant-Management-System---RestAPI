import mongoose from "mongoose";

const ingredientTypeSchema = new mongoose.Schema({
    ingredient_type_description: {
        type: String,
        required: true
    }
});


const ingredientTypes = mongoose.model('ingredientType', ingredientTypeSchema);
export default ingredientTypes;