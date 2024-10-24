import express from 'express';
const routes = express.Router();
import {getAllOrders, getSingleOrder, postOrder} from '../controllers/orderController.js';

routes.get('/',getAllOrders);
routes.get('/:id',getSingleOrder);
routes.post('/',postOrder);

// we have not provide edit 'order' option because 'order' is not edited part ...this is fix.

// we have not provide delete 'order' option because 'order' is not deleted part ..this is fix.

export default routes;