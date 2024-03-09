 return (
    <div>
      <h1>Rezept Manager</h1>
      <button onClick={recipeSearch }>Nächstes Rezept</button>
      <button onClick={addRecipe}>Neues Rezept hinzufügen</button>
      {recipe && (
        <div>
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
        </div>
      )}
      <h2>Neues Rezept hinzufügen</h2>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={newRecipe.title} onChange={handleInputChange} />
        </div>
        <div>
          <label>Beschreibung:</label>
          <input type="text" name="description" value={newRecipe.description} onChange={handleInputChange} />
        </div>
      </form>
    </div>
  );
};