import Recipe from '../models/recipeModel.js';

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRecipe = async (req, res) => {
  const { title, description } = req.body;
  
  try {
    const newRecipe = new Recipe({ title, description });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteRecipeByTitle = async (req, res) => {
  const { title } = req.params;

  try {
    const recipe = await Recipe.findOneAndDelete({ title });
    if (!recipe) {
      return res.status(404).json({ message: 'Rezept nicht gefunden' });
    }
    res.status(200).json({ message: 'Rezept erfolgreich gelöscht' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};