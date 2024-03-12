import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {versionKey: false});

const Recipe = mongoose.model('Recipe', recipeSchema, 'recipes');

export default Recipe;
