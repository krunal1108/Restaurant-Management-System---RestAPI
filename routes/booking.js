import express from 'express';
const routes = express.Router();
import { getAllBookings, getSingleBooking, postBooking, putBooking } from '../controllers/bookingContoller.js';

routes.get('/', getAllBookings);
routes.get('/:id', getSingleBooking);
routes.post('/', postBooking);
routes.put('/:id', putBooking);

// I have not provide delete 'booking', so i can't provide delete route.

export default routes;