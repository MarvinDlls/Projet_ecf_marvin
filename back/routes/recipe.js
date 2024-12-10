const express = require('express');
const router = express.Router();
const { addRecipe, getAll, deleteOne, updateOne } = require('../controllers/recipeController');

router.get("/", getAll);
router.post("/", addRecipe);
router.delete("/:id", deleteOne);
router.put("/:id", updateOne);

module.exports = router;