import express from 'express';
const routes = express.Router();
import {getAllTables, postTable, getSingleTable, putTable, deleteTable} from '../controllers/tableController.js';


routes.get('/', getAllTables);
routes.get('/:id', getSingleTable);
routes.post('/', postTable);
routes.put('/:id', putTable);
routes.delete('/:id', deleteTable);



export default routes;