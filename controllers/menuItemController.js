import menuItemModel from '../models/menuItem.model.js';
import menuModel from '../models/menu.model.js';


export const getAllMenuItems = async (req, res) => {
    try {
        const allMenuItems = await menuItemModel.find().populate('menu');
        res.status(201).json({
            message: "Get All Menu Items successfully",
            data: allMenuItems
        });
    } catch (error) {
        res.status(400).json({ error: "Not Get All Menu Items" });
    }
}


export const postMenuItem = async (req, res) => {
    try {
        const { menu_item_description, menu_item_price, menu } = req.body;

        if (!menu_item_description || !menu_item_price || !menu) {
            return res.status(400).json({ message: "Missing required fields: menu_item_description, menu_item_price, or menu ID" });
        }

        const existingMenu = await menuModel.findById(menu);
        if (!existingMenu) {
            return res.status(400).json({ message: "Invalid Menu ID" });
        }

        const menuItems = new menuItemModel({
            menu_item_description,
            menu_item_price,
            menu: existingMenu._id,
        });

        await menuItems.save();

        const menuItemsDetails = await menuItemModel
            .findById(menuItems._id)
            .populate('menu');  // Populate menu

        res.status(201).json({
            status: 201,
            message: "Submitted Menu Item Successfully",
            data: menuItemsDetails
        });
    } catch (error) {
        console.error('Error creating menu item:', error);
        res.status(500).json({ message: "Failed to submit menu item", error: error.message });
    }
};



export const getSingleMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const singleMenuItem = await menuItemModel.findById(id).populate('menu');
        if (!singleMenuItem) {
            return res.status(404).json({ message: "Single menu item not found" });
        }
        res.status(200).json({
            status: 200,
            message: "Get single menu item Successfully",
            data: singleMenuItem
        })
    } catch (error) {
        console.error('Error get single menu item:', error);
        res.status(500).json({ message: "Failed to get single menu item", error: error.message });
    }
}


export const putMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { menu_item_description, menu_item_price, menu } = req.body;

        const existingMenu = await menuModel.findById(menu);

        const updatedMenuItem = await menuItemModel.findByIdAndUpdate(id, {
            menu_item_description,
            menu_item_price,
            menu: existingMenu._id,
        }, {
            new: true,
        }).populate('menu');
        
        if (!updatedMenuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.status(200).json({
            status: 200,
            message: "Updated menu item Successfully",
            data: updatedMenuItem
        })
    } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).json({ message: "Failed to update menu item", error: error.message });
    }
}


export const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMenuItem = await menuItemModel.findByIdAndDelete(id);
        if (!deletedMenuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.status(200).json({
            status: 200,
            message: "Menu item deleted Successfully",
            data: deletedMenuItem
        })
    } catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({
            message: "Failed to delete menu item", error: error.message
        });
    }

}
