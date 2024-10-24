import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    menu_date: {
        type: Date,
        required: true
    }
});


const menus = mongoose.model('menu', menuSchema);
export default menus;