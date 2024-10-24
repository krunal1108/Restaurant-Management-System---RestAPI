import orderModel from '../models/order.model.js';
import menuItemModel from '../models/menuItem.model.js';
import orderMenuItemModel from '../models/orderMenuItem.model.js';

export const getAllOrderMenuItem = async (req, res) => {
    try {
        const orderMenuItems = await orderMenuItemModel.find()
            .populate('order')   // Populate order details
            .populate('menuItem'); // Populate menu item details

        res.status(200).json({
            status: 200,
            message: "Retrieved all order menu items successfully",
            data: orderMenuItems
        });
    } catch (error) {
        console.error('Error fetching order menu items:', error);
        res.status(500).json({ message: "Failed to retrieve order menu items", error: error.message });
    }
}

export const postOrderMenuItem = async (req, res) => {
    try {
        const { order_menu_item_quantity, order_menu_item_comments, order, menuItem } = req.body;

        const existingOrder = await orderModel.findById(order);
        const existingMenuItem = await menuItemModel.findById(menuItem);

        if (!existingOrder || !existingMenuItem) {
            return res.status(400).json({ message: "Invalid Order or Menu Item ID" });
        }

        const orderMenuItem = new orderMenuItemModel({
            order_menu_item_quantity,
            order_menu_item_comments,
            order: existingOrder._id,
            menuItem: existingMenuItem._id
        });

        await orderMenuItem.save();

        const populatedOrderMenuItem = await orderMenuItemModel
            .findById(orderMenuItem._id)
            .populate('order')   // Populate order
            .populate('menuItem'); // Populate menu item

        res.status(201).json({
            status: 201,
            message: "Order menu item created successfully",
            data: populatedOrderMenuItem
        });
    } catch (error) {
        console.error('Error creating order menu item:', error);
        res.status(500).json({ message: "Failed to create order menu item", error: error.message });
    }
}

export const getSingleOrderMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        const orderMenuItem = await orderMenuItemModel.findById(id)
            .populate('order')
            .populate('menuItem');

        if (!orderMenuItem) {
            return res.status(404).json({ message: "Order menu item not found" });
        }

        res.status(200).json({
            status: 200,
            message: "Retrieved order menu item successfully",
            data: orderMenuItem
        });
    } catch (error) {
        console.error('Error fetching order menu item:', error);
        res.status(500).json({ message: "Failed to retrieve order menu item", error: error.message });
    }
}




// // we have not provide edit 'order menu item' option because 'order menu item' is not edited part ...this is fix.

// // we have not provide delete 'order menu item' option because 'order menu item' is not deleted part ..this is fix.