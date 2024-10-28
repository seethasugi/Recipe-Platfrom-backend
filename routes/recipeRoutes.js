const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { upload, addRecipe, getRecipes } = require('../controllers/recipeController');
const { addComment,getRecipeWithComments } = require('../controllers/commentController')

router.post('/recipes', authMiddleware, upload.single('image'), addRecipe);
router.get('/recipes', getRecipes);
router.post('/recipes/:recipeId/comments', addComment);
router.get('/recipes/:recipeId', getRecipeWithComments);

module.exports = router;
