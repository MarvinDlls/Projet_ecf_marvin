const Recipe = require('../models/Recipe');

const addRecipe = async (req, res) => {
    const recipe = await Recipe.create(req.body);

    res.json(recipe);
}

const getAll = async (req, res) => {
    const recipes = await Recipe.find();

    res.json(recipes);
}

const deleteOne = async (req, res) => {
    const { id } = req.params
    await Recipe.findByIdAndDelete(id);

    res.json({ message: "Recette supprimée" });
}

const updateOne = async (req, res) => {
    const { id } = req.params

    const params = {
        title: req.body.title,
        categories: req.body.categories,
        timing: req.body.timing
    }

    const recipe = await Recipe.findByIdAndUpdate(id, params, {new: true});
    res.json(recipe);
}

module.exports = {
    addRecipe,
    getAll,
    deleteOne,
    updateOne
}