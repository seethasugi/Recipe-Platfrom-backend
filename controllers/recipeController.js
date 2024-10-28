const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Recipe = require('../models/Recipe'); 

// Create uploads directory if it doesn't exist
const dir = 'uploads/';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file
    }
});

// Initialize multer
const upload = multer({ storage: storage });

const addRecipe = async (req, res) => {
    console.log("addRecipe controller triggered"); // Add this line for debugging
    const { title, ingredients, instructions, video } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        const newRecipe = new Recipe({
            title,
            ingredients: ingredients.split(','), // Ensure this is the format you want
            instructions,
            image,
            video,
        });

        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    upload,
    addRecipe,
    getRecipes
};
