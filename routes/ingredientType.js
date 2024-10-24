import express from 'express';
const routes = express.Router();
import { getAllIngredientTypes, getSingleIngredientType, postIngredientType, putIngredientType, deleteIngredientType } from '../controllers/ingredientTypeController.js';

routes.get('/', getAllIngredientTypes);
routes.get('/:id', getSingleIngredientType);
routes.post('/', postIngredientType);
routes.put('/:id', putIngredientType);
routes.delete('/:id', deleteIngredientType);

export default routes;