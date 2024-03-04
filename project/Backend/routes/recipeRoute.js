import express from "express";
import Recipe from "../models/recipeSchema.js"; 

const router = express.Router();

// Route für das Erstellen eines neuen Rezepts
router.post("/recipes", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).send(recipe);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route für das Lesen aller Rezepte
router.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route für das Lesen eines bestimmten Rezepts
router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).send();
    }
    res.send(recipe);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route für das Aktualisieren eines Rezepts
router.patch("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
    if (!recipe) {
      return res.status(404).send();
    }
    res.send(recipe);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route für das Löschen eines Rezepts
router.delete("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      return res.status(404).send();
    }
    res.send(recipe);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
