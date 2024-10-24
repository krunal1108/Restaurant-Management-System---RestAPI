import express from 'express';
const routes = express.Router();
import {getAllStaff, getSingleStaff, postStaff, deleteStaff} from '../controllers/staffController.js';

routes.get('/',getAllStaff);
routes.get('/:id',getSingleStaff);
routes.post('/',postStaff);

// we have not provide edit 'staff' option because 'staff' is not edited part ...this is fix.

routes.delete('/:id',deleteStaff);

export default routes;