import express from 'express';
const routes = express.Router();
import {getAllMenuItems, getSingleMenuItem, postMenuItem, putMenuItem, deleteMenuItem} from '../controllers/menuItemController.js';

routes.get('/',getAllMenuItems);
routes.get('/:id',getSingleMenuItem);
routes.post('/',postMenuItem);
routes.put('/:id',putMenuItem);
routes.delete('/:id',deleteMenuItem);

export default routes;