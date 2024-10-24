import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    date_of_booking: {
        type: Date,
        required: true
    },
    number_in_party: {
        type: Number,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'table',
        required: true
    }
});



const bookings = mongoose.model('booking', bookingSchema);
export default bookings;