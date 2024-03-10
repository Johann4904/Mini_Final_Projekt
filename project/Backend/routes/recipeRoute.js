import express from 'express';
import { getAllRecipes, createRecipe, deleteRecipeByTitle } from '../controller/recipeController.js';

const router = express.Router();


router.get('/recipes', getAllRecipes);
router.post('/recipes', createRecipe);
router.delete('/recipes/:title', deleteRecipeByTitle);

export default router;
