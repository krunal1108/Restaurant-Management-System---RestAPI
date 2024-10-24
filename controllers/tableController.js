import bookingModel from '../models/booking.model.js';
import customerModel from '../models/customer.model.js';
import tableModel from '../models/table.model.js';

export const getAllTables = async (req, res) => {
    try {
        const tables = await tableModel.find().populate({ path: "booking", populate: { path: "customer" } });
        res.status(201).json({
            message: "Get All Tables successfully",
            data: tables
        });
    } catch (error) {
        res.status(400).json({ error: "Not Get All Tables" });
    }
}


export const postTable = async (req, res) => {
    try {
        const { table_number, table_details, customer, booking } = req.body;

        const existingCustomer = await customerModel.findById(customer);
        const existingBooking = await bookingModel.findById(booking);

        const tables = new tableModel({
            table_number,
            table_details,
            customer: existingCustomer._id,
            booking: existingBooking._id
        });
        console.log("Table Create sucessfully", tables);
        await tables.save();

        const tableDetails = await tableModel.find({}).populate({ path: "booking", populate: { path: "customer" } });
        res.status(201).json({
            message: "Table created successfully",
            data: { tableDetails }
        });
    } catch (error) {
        console.error('Error creating table:', error);
        res.status(500).json({ message: 'Error creating table', error: error.message });
    }
};


export const getSingleTable = async (req, res) => {
    try {
        const { id } = req.params;
        const tableSingle = await tableModel.find({ _id: id }).populate({ path: "booking", populate: { path: "customer" } });
        res.json({
            status: 201,
            message: "Get Single Table Successfully",
            data: tableSingle
        });
    } catch (error) {
        res.status(400).json({ error: "Not Get Single Table" });
    }
}


export const putTable = async (req, res) => {
    try {
        const { id } = req.params;
        const { table_number, table_details } = req.body;
        const updateTable = await tableModel.findByIdAndUpdate(id, {
            table_number,
            table_details
        }, { new: true }).populate({ path: "booking", populate: { path: "customer" } });
        res.json({
            status: 201,
            message: "Table Updated Successfully",
            data: updateTable
        });
    } catch (error) {
        res.status(400).json({ error: "Not Update Table" });
    }
}

export const deleteTable = async (req, res) => {
    try {
        const { id } = req.params;
        const deletetable = await tableModel.findByIdAndDelete({ _id:id });
        res.json({
            status: 201,
            message: "Delete Customer Succesfully",
            data: deletetable
        });
    } catch (error) {
        res.status(400).json({ error: "Not Delete Table" });
    }
}
