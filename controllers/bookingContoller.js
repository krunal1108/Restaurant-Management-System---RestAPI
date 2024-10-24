import bookingModel from '../models/booking.model.js';
import customerModel from '../models/customer.model.js';
import tableModel from '../models/table.model.js';

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingModel
            .find()
            .populate('customer')  // Populate customer
            .populate('table');     // Populate table

        if (!bookings.length) {
            return res.status(404).json({ message: "No bookings found" });
        }

        res.status(200).json({
            message: "All bookings retrieved successfully",
            data: bookings
        });
    } catch (error) {
        console.error('Error retrieving bookings:', error);
        res.status(500).json({ message: "Failed to retrieve bookings", error: error.message });
    }
};


export const postBooking = async (req, res) => {
    try {
        const { date_of_booking, number_in_party, customer, table } = req.body;

        const existingCustomer = await customerModel.findById(customer);
        const existingTable = await tableModel.findById(table);

        if (!existingCustomer || !existingTable) {
            return res.status(400).json({ message: "Invalid customer or table ID" });
        }

        const booking = new bookingModel({
            date_of_booking,
            number_in_party,
            customer: existingCustomer._id,
            table: existingTable._id
        });

        await booking.save();

        const bookingDetails = await bookingModel
            .findById(booking._id)
            .populate('customer')   // Populate customer
            .populate('table');     // Populate table

        res.status(201).json({
            message: "Booking created successfully",
            data: bookingDetails
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: "Failed to create booking", error: error.message });
    }
};

// Get Single Booking
export const getSingleBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await bookingModel
            .findById(id)
            .populate('customer')   // Populate customer
            .populate('table');     // Populate table

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({
            message: "Booking retrieved successfully",
            data: booking
        });
    } catch (error) {
        console.error('Error retrieving booking:', error);
        res.status(500).json({ message: "Failed to retrieve booking", error: error.message });
    }
};


export const putBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { date_of_booking, number_in_party, customer, table } = req.body;

        const existingCustomer = await customerModel.findById(customer);
        const existingTable = await tableModel.findById(table);

        if (!existingCustomer || !existingTable) {
            return res.status(400).json({ message: "Invalid customer or table ID" });
        }

        const updatedBooking = await bookingModel
            .findByIdAndUpdate(id, {
                date_of_booking,
                number_in_party,
                customer: existingCustomer._id,
                table: existingTable._id
            }, { new: true })
            .populate('customer')  // Populate customer
            .populate('table');    // Populate table

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({
            message: "Booking updated successfully",
            data: updatedBooking
        });
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ message: "Failed to update booking", error: error.message });
    }
};
