import orderModel from '../models/order.model.js';
import staffModel from '../models/staff.model.js';
import tableModel from '../models/table.model.js';


export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate('staff').populate('table');
        res.json({
            status: 201,
            message: "Get All Orders Successfully",
            data: orders
        });
    } catch (error) {
        console.error('Error get all order:', error);
        res.status(500).json({ message: "Failed to get all orders", error: error.message });
    }
}


export const postOrder = async (req, res) => {
    try {
        const {order_date_time, staff, table} = req.body;

        const existingStaff = await staffModel.findById(staff);
        const existingTable = await tableModel.findById(table);

        if (!existingStaff || !existingTable) {
            return res.status(400).json({ message: "Invalid Staff or Table ID" });
        }

        const orders = new orderModel({
            order_date_time,
            staff: existingStaff._id,
            table: existingTable._id
        });

        await orders.save();

        const orderDetails = await orderModel
            .findById(orders._id)
            .populate('staff')   // Populate staff
            .populate('table');     // Populate table

        res.status(201).json({
            status: 201,
            message: "Get order Successfully",
            data: orderDetails
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: "Failed to create order", error: error.message });
    }
}


export const getSingleOrder = async (req, res) => {
    try {
        const {id} = req.params;
        const order = await orderModel.findById(id).populate('staff').populate('table');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({
            status: 200,
            message: "Get single order Successfully",
            data: order
        })
    } catch (error) {
        console.error('Error get single order:', error);
        res.status(500).json({ message: "Failed to get single order", error: error.message });
    }
}



// we have not provide edit 'order' option because 'order' is not edited part ...this is fix.

// we have not provide delete 'order' option because 'order' is not deleted part ..this is fix.
