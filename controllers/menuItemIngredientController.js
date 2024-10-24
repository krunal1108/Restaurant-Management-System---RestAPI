import menuItemModel from "../models/menuItem.model.js";
import ingredientsModel from "../models/ingredients.model.js";
import menuItemIngredientModel from "../models/menuItemIngredient.model.js";


export const getAllMenuItemIngredients = async (req, res) => {
    try {
        const menuItemIngredients = await menuItemIngredientModel
            .find()
            .populate('menuItemsAll')    // populate menu item
            .populate('ingredientsAll'); // populate ingredient

        if (!menuItemIngredients) {
            return res.status(404).json({ message: "No menu item ingredient found" });
        }

        res.status(200).json({
            message: "All menu item ingredient retrieved successfully",
            data: menuItemIngredients
        });
    } catch (error) {
        console.error('Error retrieving menu item ingredient:', error);
        res.status(500).json({ message: "Failed to retrieve menu item ingredient", error: error.message });
    }
};


export const postMenuItemIngredient = async (req, res) => {
    try {
        const { item_quantity, menuItemsAll, ingredientsAll } = req.body;

        const existingMenuItem = await menuItemModel.findById(menuItemsAll);
        const existingIngredient = await ingredientsModel.findById(ingredientsAll);

        if (!existingMenuItem || !existingIngredient) {
            return res.status(400).json({ message: "Invalid menu item or ingredient ID" });
        }

        
        const menuItemIngredient = new menuItemIngredientModel({
            item_quantity,
            menuItemsAll: existingMenuItem._id,
            ingredientsAll: existingIngredient._id
        });

        await menuItemIngredient.save();

        const menuItemIngredientDetails = await menuItemIngredientModel
            .findById(menuItemIngredient._id)
            .populate('menuItemsAll')   
            .populate('ingredientsAll');     

        res.status(201).json({
            message: "menu item ingredient created successfully",
            data: menuItemIngredientDetails
        });
    } catch (error) {
        console.error('Error creating menu item ingredient:', error);
        res.status(500).json({ message: "Failed to create menu item ingredient", error: error.message });
    }
};


export const getSingleMenuItemIngredient = async (req, res) => {
    try {
        const { id } = req.params;
        const menuItemIngredient = await menuItemIngredientModel
            .findById(id)
            .populate('menuItemsAll')   
            .populate('ingredientsAll');    

        if (!menuItemIngredient) {
            return res.status(404).json({ message: "menu item ingredient not found" });
        }

        res.status(200).json({
            message: "menu item ingredient retrieved successfully",
            data: menuItemIngredient
        });
    } catch (error) {
        console.error('Error retrieving menu item ingredient:', error);
        res.status(500).json({ message: "Failed to retrieve menu item ingredient", error: error.message });
    }
};



// we have not provide update 'Menu Item Ingredient' .. so we not make Update Controller..

// we have not provide delete 'Menu Item Ingredient' .. so we not make Delete Controller.. 
