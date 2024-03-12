import { useState, useEffect } from 'react';

  const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Der Suchbegriff, nach dem gesucht wird.
  const [searchResults, setSearchResults] = useState([]); //  Die Ergebnisse der Suche.
  const [editingRecipe, setEditingRecipe] = useState(null); // Der Titel des Rezepts, das gerade bearbeitet wird.
  const [updatedDescription, setUpdatedDescription] = useState(''); // Die aktualisierte Beschreibung des Rezepts während der Bearbeitung.

  const handleSearchChange = (event) => { // Wird aufgerufen, wenn sich der Suchbegriff ändert.
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSearchResults([]);
    } else if (searchTerm.length >= 3) {
      handleSearchSubmit();
    }
  }, [searchTerm]);

  const handleSearchSubmit = () => { //  Wird aufgerufen, um die Rezeptsuche auszuführen.
    fetch(`http://localhost:5000/recipes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Rezepte');
      }
      return response.json();
    })
    .then(recipeData => {
      setSearchResults([]);
      const filteredRecipes = recipeData.filter(recipe =>
        recipe.title && recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredRecipes);
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleDeleteSearchResult = async () => { // Wird aufgerufen, um die ausgewählten Suchergebnisse zu löschen.
    try {
      for (const recipe of searchResults) {
        const response = await fetch(`http://localhost:5000/recipes/${recipe.title}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Fehler beim Löschen des Rezepts');
        }
      }
      setSearchResults([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateRecipe = (title) => { // Wird aufgerufen, um die Bearbeitung eines bestimmten Rezepts zu starten.
    setEditingRecipe(title);
    const recipe = searchResults.find(recipe => recipe.title === title);
    setUpdatedDescription(recipe.description);
  };

  const handleSaveRecipeChange = (event) => { // Wird aufgerufen, wenn sich die aktualisierte Beschreibung des Rezepts ändert.
    setUpdatedDescription(event.target.value);
  };

  const handleConfirmUpdate = async (title) => { //
    try {
      const response = await fetch(`http://localhost:5000/recipes/${title}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: updatedDescription })
      });
  
      if (!response.ok) {
        throw new Error('Fehler beim Aktualisieren des Rezepts');
      }
  
      // Rezept aktualisiert, also aktualisiere die Suchergebnisse.
      handleSearchSubmit();
      setEditingRecipe(null);
      setUpdatedDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='box box-search'>
      <a href="/">zurück</a>
      <h2>Rezeptsuche</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }}>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleSearchChange} 
          placeholder="Suche nach Rezepten..." 
        />
        {searchResults.length > 0 && (
          <>
            <button onClick={handleDeleteSearchResult}>Löschen</button>
          </>
        )}
      </form>
      {searchResults.length > 0 && (
        <div>
          <h3>Suchergebnisse:</h3>
          <ul>
            {searchResults.map(recipe => (
              <li key={recipe.title}>
                <div className='box-aktual'>
                  <h4>{recipe.title}</h4>
                  {editingRecipe === recipe.title ? (
                    <>
                      <textarea 
                        value={updatedDescription}
                        onChange={handleSaveRecipeChange}
                      ></textarea>
                      <button className='btn-aktual' onClick={() => handleConfirmUpdate(recipe.title)}>Aktualisieren</button>
                    </>
                  ) : (
                    <>
                      <p>{recipe.description}</p>
                      <button className='btn-bearb' onClick={() => handleUpdateRecipe(recipe.title)}>Bearbeiten</button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecipeSearch;
