import mongoose from "mongoose";

const menuItemIngredientSchema = new mongoose.Schema({
    item_quantity: { 
        type: Number,
        required: true
    },
    menuItemsAll: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menuItem',
        required: true
    },
    ingredientsAll: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ingredients',
        required: true
    }
});


const menuItemIngredients = mongoose.model('menu_item_ingredient', menuItemIngredientSchema);
export default menuItemIngredients;