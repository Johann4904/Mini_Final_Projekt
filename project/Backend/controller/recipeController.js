import Recipe from '../models/recipeModel.js';


//get
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//POST
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

//DELETE
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

//PATCH
export const updateRecipe = async (req, res) => {
  const { title } = req.params;
  const { description } = req.body;

  try {
    const recipe = await Recipe.findOne({ title });
    if (!recipe) {
      return res.status(404).json({ message: 'Rezept nicht gefunden' });
    }

    recipe.description = description;
    await recipe.save();

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};