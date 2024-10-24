import express from 'express';
const routes = express.Router();
import {getAllOrderMenuItem, getSingleOrderMenuItem, postOrderMenuItem} from '../controllers/orderMenuItemController.js';

routes.get('/',getAllOrderMenuItem);
routes.get('/:id',getSingleOrderMenuItem);
routes.post('/',postOrderMenuItem);

// we have not provide edit 'order menu item' option because 'order menu item' is not edited part ...this is fix.

// we have not provide delete 'order menu item' option because 'order menu item' is not deleted part ..this is fix.

export default routes;