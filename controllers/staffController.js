import staffModel from '../models/staff.model.js';
import staffRoleModel from '../models/staff_role.model.js';


export const getAllStaff = async (req, res) => {
    try {
        const staffs = await staffModel.find().populate('staff_role');

        res.json({
            status: 201,
            message: "Get All Staff Successfully",
            data: staffs
        });
    } catch (error) {
        res.status(500).json({ error: "Error get all staff" });
    }
}


export const postStaff = async (req, res) => {
    try {
        const { staff_first_name, staff_last_name, staff_role } = req.body;
        const existingStaff = await staffRoleModel.findById(staff_role);

        if (!staff_first_name || !staff_last_name || !staff_role) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }
        const staff = new staffModel({
            staff_first_name,
            staff_last_name,
            staff_role: existingStaff._id
        })
        await staff.save();

        const staffDetails = await staffModel.find({}).populate('staff_role');
        res.status(201).json({
            message: "Staff created successfully",
            data: { staffDetails }
        });
    } catch (error) {
        res.status(500).json({ error: "Error creating staff" });
    }
}


export const getSingleStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const staff = await staffModel.findById({ _id: id }).populate('staff_role');
        if (!staff) {
            return res.status(404).json({ error: "Staff not found" });
        }
        res.json({
            status: 201,
            message: "Get Single Staff Successfully",
            data: staff
        });
    } catch (error) {
        res.status(500).json({ error: "Error get single staff" });
    }
}


// we have not provide edit 'staff' option because 'staff' is not edited part ...this is fix.



export const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const removeStaff = await staffModel.findByIdAndDelete({ _id: id });
        if (!removeStaff) {
            return res.status(404).json({ error: "Staff not found" });
        }
        res.json({
            status: 201,
            message: "delete Staff Successfully",
            data: removeStaff
        });
    } catch (error) {
        res.status(500).json({ error: "Error delete staff" });
    }
}

