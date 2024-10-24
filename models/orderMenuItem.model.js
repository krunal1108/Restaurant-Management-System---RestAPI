import mongoose from "mongoose";

const orderMenuItemSchema = new mongoose.Schema({
    order_menu_item_quantity: { 
        type: String,
        required: true
    },
    order_menu_item_comments: {
        type: String,
        default: ''
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menuItem',
        required: true
    }
});


const orderMenuItems = mongoose.model('order_menu_item', orderMenuItemSchema);
export default orderMenuItems;