import express from 'express';
import { getAllRecipes, createRecipe } from '../controller/recipeController.js';

const router = express.Router();


router.get('/recipes', getAllRecipes);
router.post('/recipes', createRecipe);

export default router;
