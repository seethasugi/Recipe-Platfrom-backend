const Comment = require('../models/Comment');
const Recipe = require('../models/Recipe');

const addComment = async (req, res) => {
    const { username, text,ratings,recipeTitle } = req.body;
    const { recipeId } = req.params; // Get recipeId from request parameters

    try {
        // Create a new comment instance
        const newComment = new Comment({
            recipeId,
            username,
            recipeTitle,
            text
        });

        // Save the comment to the database
        const savedComment = await newComment.save();

        // Update the recipe's comments array
        await Recipe.findByIdAndUpdate(recipeId, {
            $push: { comments: savedComment._id ,ratings:ratings}
        });

        return res.status(201).json({
            success: true,
            message: 'Comment added successfully!',
            comment: savedComment
        });
    } catch (error) {
        console.error('Error adding comment:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const getRecipeWithComments = async (req, res) => {
    const { recipeId } = req.params;

    try {
        // Find the recipe and populate the comments
        const recipe = await Recipe.findById(recipeId)
            .populate('comments'); // Populate comments

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        return res.status(200).json({
            success: true,
            recipe
        });
    } catch (error) {
        console.error('Error fetching recipe:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    addComment,
    getRecipeWithComments
};