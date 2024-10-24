import express from 'express';
const routes = express.Router();
import {getAllMenuItemIngredients, getSingleMenuItemIngredient, postMenuItemIngredient} from '../controllers/menuItemIngredientController.js';

routes.get('/',getAllMenuItemIngredients);
routes.get('/:id',getSingleMenuItemIngredient);
routes.post('/',postMenuItemIngredient);

// we have not provide 'Menu Item Ingredient' update.. so this is fix.

// we have not provide 'Menu Item Ingredient' delete.. so this is fix.

export default routes;