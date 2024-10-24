import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    order_date_time: { 
        type: String,
        required: true
    },
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staff',
        required: true
    },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'table',
        required: true
    }
});


const orders = mongoose.model('order', orderSchema);
export default orders;