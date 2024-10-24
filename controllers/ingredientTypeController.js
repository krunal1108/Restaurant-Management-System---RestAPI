import ingredientTypeModel from "../models/ingredientType.model.js";


export const getAllIngredientTypes = async (req, res) => {
    try {
        const allIngredientType = await ingredientTypeModel.find();
        res.json({
            status: 201,
            message: "Get All Ingredients Types Succesfully",
            data: allIngredientType
        });
    } catch (error) {
        res.status(400).json({ error: "Not Get Ingredients Types" });
    }
}

export const postIngredientType = async (req, res) => {
    try {
        const { ingredient_type_description } = req.body;

        if (!ingredient_type_description) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }

        const ingredienttype = new ingredientTypeModel({
            ingredient_type_description
        });

        await ingredienttype.save();

        return res.status(201).json({
            message: "Submit Ingredient Type Successfully",
            data: ingredienttype
        });

    } catch (error) {
        console.error("Error saving ingredient type:", error);
        return res.status(500).json({ error: "Ingredient Type not submitted" });
    }
};


export const getSingleIngredientType = async (req, res) => {
    try {
        const { id } = req.params;
        const singleIngredientType = await ingredientTypeModel.findOne({ _id: id });
        res.json({
            status: 201,
            message: "Get Single Ingredient Type Successfully",
            data: singleIngredientType
        });
    } catch (error) {
        res.status(400).json({ error: "Get not Ingredient Type" });
    }
}

export const putIngredientType = async (req, res) => {
    try {
        const { ingredient_type_description } = req.body;
        const { id } = req.params;
        const updateIngredientType = await ingredientTypeModel.findByIdAndUpdate(id, { ingredient_type_description }, { new: true });
        res.json({
            status: 201,
            message: "Update Ingredient Type Succesfully",
            data: updateIngredientType
        });
    } catch (error) {
        res.status(400).json({ error: "Not Update the Ingredient Type" });
    }
}

export const deleteIngredientType = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteIngredientType = await ingredientTypeModel.findByIdAndDelete({ _id: id });
        res.json({
            status: 201,
            message: "Delete Ingredient Type Succesfully",
            data: deleteIngredientType
        });
    } catch (error) {
        res.status(404).json({ error: "Not Delete the Ingredient Type" });
    }
}

