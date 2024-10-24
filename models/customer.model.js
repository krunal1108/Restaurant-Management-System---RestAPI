import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    customer_first_name: {
        type: String,
        required: true
    },
    customer_surname: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    cellphone_number: {
        type: String,
        required: true
    },
    email_address: {
        type: String,
        required: true,
        unique: true
    },
    other_customer_details: {
        type: String
    }
});


const customer = mongoose.model('customer', customerSchema);
export default customer;