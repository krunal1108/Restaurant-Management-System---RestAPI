import ingredientsModel from '../models/ingredients.model.js';
import ingredientTypesModel from '../models/ingredientType.model.js';


export const getAllIngredients = async (req, res) => {
    try {
        const allIngredients = await ingredientsModel.find().populate('ingredientTypes');
        res.status(201).json({
            message: "Get All Ingredients successfully",
            data: allIngredients
        });
    } catch (error) {
        res.status(400).json({ error: "Not Get All Ingredients" });
    }
}



export const postIngredient = async (req, res) => {
    try {
        const { ingredient_name, ingredientTypes } = req.body;

        if (!ingredient_name || !ingredientTypes) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }

        const ingredientTypesAll = await ingredientTypesModel.findById(ingredientTypes);
        if (!ingredientTypesAll) {
            return res.status(400).json({ message: "Invalid ingredient type ID" });
        }

        const ingredients = new ingredientsModel({
            ingredient_name,
            ingredientTypes: ingredientTypesAll._id
        });

        await ingredients.save();

        const populatedIngredient = await ingredients.populate('ingredientTypes');

        return res.status(201).json({
            message: "Submit Ingredient Successfully",
            data: populatedIngredient
        });

    } catch (error) {
        console.error("Error saving ingredient:", error);
        return res.status(500).json({ error: "Ingredient not submitted" });
    }
};



export const getSingleIngredient = async (req, res) => {
    try {
        const { id } = req.params;
        const singleIngredient = await ingredientsModel.findById(id).populate('ingredientTypes');
        if (!singleIngredient) {
            return res.status(404).json({ message: "Ingredient item not found" });
        }
        res.status(200).json({
            status: 200,
            message: "Get single Ingredient Successfully",
            data: singleIngredient
        })
    } catch (error) {
        console.error('Error get single Ingredient:', error);
        res.status(500).json({ message: "Failed to get single Ingredient", error: error.message });
    }
}



export const putIngredient = async (req, res) => {
    try {
        const { id } = req.params;
        const { ingredient_name, ingredientTypes } = req.body;

        const existingIngredient = await ingredientTypesModel.findById(ingredientTypes);

        const updatedIngredient = await ingredientsModel.findByIdAndUpdate(id, {
            ingredient_name,
            ingredientTypes: existingIngredient._id
        }, {
            new: true,
        }).populate('ingredientTypes');
        if (!updatedIngredient) {
            return res.status(404).json({ message: "Ingredient not found" });
        }
        res.status(200).json({
            status: 200,
            message: "Updated Ingredient Successfully",
            data: updatedIngredient
        })
    } catch (error) {
        console.error('Error updating Ingredient:', error);
        res.status(500).json({ message: "Failed to update Ingredient", error: error.message });
    }
}


export const deleteIngredient = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedIngredient = await ingredientsModel.findByIdAndDelete(id);
        if (!deletedIngredient) {
            return res.status(404).json({ message: "Ingredient not found" });
        }
        res.status(200).json({
            status: 200,
            message: "Ingredient deleted Successfully",
            data: deletedIngredient
        })
    } catch (error) {
        console.error('Error deleting Ingredient:', error);
        res.status(500).json({
            message: "Failed to delete Ingredient", error: error.message
        });
    }

}
