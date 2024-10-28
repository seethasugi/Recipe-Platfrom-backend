const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [String],
  instructions: String,
  image: String,
  video: String,
  ratings: [Number],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  views: { type: Number, default: 0 },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;
