import customerModel from '../models/customer.model.js';


export const getAllCustomers = async (req, res) => {
    try {
        const allCustomers = await customerModel.find();
        res.json({
            status: 201,
            message: "Get All Customers Succesfully",
            data: allCustomers
        });
    } catch (error) {
        res.status(400).json({ error: "Not Get All Customers" });
    }
}

export const postCustomer = async (req, res) => {
    try {
        const { customer_first_name, customer_surname, phone_number, cellphone_number, email_address, other_customer_details } = req.body;

        if (!customer_first_name || !customer_surname || !phone_number || !cellphone_number || !email_address) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }
        
        const customer = new customerModel({
            customer_first_name,
            customer_surname,
            phone_number,
            cellphone_number,
            email_address,
            other_customer_details
        });

        await customer.save();
        res.status(200).json(customer);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Customer not submitted" });
    }
}


export const getSingleCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const singleCutomer = await customerModel.findOne({ _id: id });
        res.json({
            status: 201,
            message: "Get Single Customer Successfully",
            data: singleCutomer
        });
    } catch (error) {
        res.status(400).json({ error: "Get not Single Customer" });
    }
}

export const putCustomer = async (req, res) => {
    try {
        const { customer_first_name, customer_surname, phone_number, cellphone_number, email_address, other_customer_details } = req.body;
        const { id } = req.params;
        const updateCustomer = await customerModel.findByIdAndUpdate(id, { customer_first_name, customer_surname, phone_number, cellphone_number, email_address, other_customer_details }, { new: true });
        res.json({
            status: 201,
            message: "Update Customer Succesfully",
            data: updateCustomer
        });
    } catch (error) {
        res.status(400).json({ error: "Not Update the Customer" });
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCustomer = await customerModel.findByIdAndDelete({ _id: id });
        res.json({
            status: 201,
            message: "Delete Customer Succesfully",
            data: deleteCustomer
        });
    } catch (error) {
        res.status(404).json({ error: "Not Delete the Customer" });
    }
}

