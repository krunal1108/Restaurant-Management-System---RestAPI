import mongoose from "mongoose";

const staff_role_Schema = new mongoose.Schema({
    staff_first_name: { 
        type: String,
        required: true
    },
    staff_last_name: {
        type: String,
        required: true
    },
    staff_role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staff_role',
        required: true
    }
});


const staff_roles = mongoose.model('staff', staff_role_Schema);
export default staff_roles;