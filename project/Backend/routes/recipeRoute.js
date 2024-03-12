import express from 'express';
import { getAllRecipes, createRecipe, deleteRecipeByTitle, updateRecipe } from '../controller/recipeController.js';

const router = express.Router();


router.get('/recipes', getAllRecipes);
router.post('/recipes', createRecipe);
router.delete('/recipes/:title', deleteRecipeByTitle);
router.patch('/recipes/:title', updateRecipe);

export default router;
