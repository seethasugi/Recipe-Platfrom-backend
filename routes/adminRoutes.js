const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, deleteRecipe,getReceipes,getComments } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/users', authMiddleware, getUsers);
router.get('/recipes', authMiddleware, getReceipes);
router.delete('/users/:id', authMiddleware, deleteUser);
router.delete('/recipes/:id', authMiddleware, deleteRecipe);
router.get('/Comments', authMiddleware, getComments);


module.exports = router;
