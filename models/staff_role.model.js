import mongoose from "mongoose";

const staff_role_Schema = new mongoose.Schema({
    staff_role_code: { 
        type: String,
        required: true
    },
    staff_role_description: {
        type: String,
        required: true
    }
});


const staff_roles = mongoose.model('staff_role', staff_role_Schema);
export default staff_roles;