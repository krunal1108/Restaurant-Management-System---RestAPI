import menuModel from '../models/menu.model.js';

export const getAllMenus = async (req, res) => {
    try {
        const allMenus = await menuModel.find();
        res.json({
            status: 201,
            message: "Get All Menus Succesfully",
            data: allMenus
        });
    } catch (error) {
        res.status(400).json({ error: "Not Get All Menus" });
    }
}

export const postMenu = async (req, res) => {
    try {
        const { menu_date } = req.body;

        if (!menu_date) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }

        const menu = new menuModel({
            menu_date
        });

        await menu.save();
        res.json({
            status: 201,
            message: "Submitted Menu Successfully",
            data: menu
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Menu not submitted" });
    }
}


export const getSingleMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const singleMenu = await menuModel.findOne({ _id: id });
        res.json({
            status: 201,
            message: "Get Single Menu Successfully",
            data: singleMenu
        });
    } catch (error) {
        res.status(400).json({ error: "Get not Single Menu" });
    }
}

export const putMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const { menu_date } = req.body;
        const menu = await menuModel.findByIdAndUpdate(id, { menu_date }, { new: true });
        res.json({
            status: 201,
            message: "Menu Updated Successfully",
            data: menu
        });
    } catch (error) {
        res.status(400).json({ error: "Menu not updated" });
    }
}

export const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteMenu = await menuModel.findByIdAndDelete({ _id: id });
        res.json({
            status: 201,
            message: "Menu deleted Successfully",
            data: deleteMenu
        });
    } catch (error) {
        res.status(400).json({ error: "Menu not deleted" });
    }
}

