import express from 'express';
const routes = express.Router();
import {getAllCustomers, getSingleCustomer, postCustomer, putCustomer, deleteCustomer} from '../controllers/customerController.js';

routes.get('/',getAllCustomers);
routes.get('/:id',getSingleCustomer);
routes.post('/',postCustomer);
routes.put('/:id',putCustomer);
routes.delete('/:id',deleteCustomer);

export default routes;