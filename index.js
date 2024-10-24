import express from "express";
const app = express();
const port = 3009;

// Import all routes from routes file
import router from './routes/routes.js';
import customers from './routes/customerRoutes.js';
import bookings from './routes/booking.js';
import tables from './routes/table.js';
import staff_roles from './routes/staff_role.js';
import staffs from './routes/staff.js';
import orders from './routes/order.js';
import menus from './routes/menu.js';
import menu_items from './routes/menuItem.js';
import order_menu_items from './routes/orderMenuItem.js';
import ingredientTypes from "./routes/ingredientType.js";
import ingredients from './routes/ingredients.js';
import menuItemIngredients from "./routes/menuItemIngredient.js";


import bodyParser from "body-parser";

// Database connection
import database from './config/db.js';



// Set up body parser
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



// Routes for all pages
app.use('/',router);
app.use('/customer',customers);
app.use('/booking',bookings);
app.use('/table',tables);
app.use('/staff_role',staff_roles);
app.use('/staff',staffs)
app.use('/order',orders);
app.use('/menu',menus);
app.use('/menu_item',menu_items)
app.use('/order_menu_item',order_menu_items);
app.use('/ingredient_type',ingredientTypes);
app.use('/ingredient',ingredients);
app.use('/menu_item_ingredient',menuItemIngredients);




// execute or run project on this url
app.listen(port, (error)=>{
    if(!error){
        console.log(`Server Running on http://localhost:${port}`);
    }
});