import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    menu_item_description: {
        type: String,
        required: true
    },
    menu_item_price: {
        type: Number,
        required: true
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menu',
        required: true
    }
});


const menuItems = mongoose.model('menuItem', menuItemSchema);
export default menuItems;