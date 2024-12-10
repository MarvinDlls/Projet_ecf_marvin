const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
    title: String,
    categories: String,
    timing: String,
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;