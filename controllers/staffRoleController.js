import staffRoleModel from '../models/staff_role.model.js';


export const getAllStaffRoles = async (req, res) => {
    try {
        const allStaffRoles = await staffRoleModel.find();
        res.json({
            status: 201,
            message: "Staff Role created successfully",
            data: allStaffRoles
        });
    } catch (error) {
        res.status(500).json({ error: "Error get all staff role" });        
    }
}

export const postStaffRole = async (req, res) => {
    try {
        const { staff_role_code, staff_role_description } = req.body;
        if (!staff_role_code || !staff_role_description) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }
        const staff_role = new staffRoleModel({
            staff_role_code,
            staff_role_description
        });
        await staff_role.save();
        res.json({
            status: 201,
            message: "Staff Role created successfully",
            data: staff_role
        });
    } catch (error) {
        res.status(500).json({ error: "Error creating staff role" });
    }
}


export const getSingleStaffRole = async (req, res) => {
    try {
        const {id} = req.params;
        const singleStaffRole = await staffRoleModel.findOne({_id: id});
        res.json({
            status: 201,
            message: "Get single staff role Successfully",
            data: singleStaffRole
        });
    } catch (error) {
        res.status(500).json({ error: "Error get single staff role" });
    }
}


// we have not provide edit 'staff_role' option because 'staff_role' is not edited part ...this is fix.



export const deleteStaffRole = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteStaffRole = await staffRoleModel.findByIdAndDelete({_id: id});
        res.json({
            status: 200,
            message: "Staff Role deleted successfully",
            data: deleteStaffRole
            });
    } catch (error) {
        res.status(500).json({ error: "Error deleting staff role" });
    }
}

