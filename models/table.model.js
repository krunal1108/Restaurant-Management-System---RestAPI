import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
    table_number: {
        type: Number,
        required: true
    },
    table_details: {
        type: String,
        required: true
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'booking',
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    }
});


const tables = mongoose.model('table', tableSchema);
export default tables;