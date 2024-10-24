import express from 'express';
const routes = express.Router();
import { getAllIngredients, getSingleIngredient, postIngredient, putIngredient, deleteIngredient } from '../controllers/ingredientsController.js';

routes.get('/', getAllIngredients);
routes.get('/:id', getSingleIngredient);
routes.post('/', postIngredient);
routes.put('/:id', putIngredient);
routes.delete('/:id', deleteIngredient);

export default routes;