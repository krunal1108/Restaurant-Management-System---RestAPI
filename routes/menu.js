import express from 'express';
const routes = express.Router();
import {getAllMenus, getSingleMenu, postMenu, putMenu, deleteMenu} from '../controllers/menuController.js';

routes.get('/',getAllMenus);
routes.get('/:id',getSingleMenu);
routes.post('/',postMenu);
routes.put('/:id',putMenu);
routes.delete('/:id',deleteMenu);

export default routes;