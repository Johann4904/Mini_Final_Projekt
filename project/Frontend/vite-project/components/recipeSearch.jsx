import React, { useState } from 'react';

const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // API-Anfrage an deine Backend-Server-Endpoint senden
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
      // Suchergebnisse filtern basierend auf dem Suchbegriff
      const filteredRecipes = recipeData.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredRecipes);
    })
    .catch(error => {
      console.error(error);
    });
  };
  
  return (
    <div>
      <h2>Rezeptsuche</h2>
      <form onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleSearchChange} 
          placeholder="Suche nach Rezepten..." 
        />
        <button type="submit">Suche</button>
      </form>
      {searchResults.length > 0 && (
        <div>
          <h3>Suchergebnisse:</h3>
          <ul>
            {searchResults.map(recipe => (
              <li key={recipe.id}>
                <h4>{recipe.name}</h4>
                <p>{recipe.description}</p>
                {/* Weitere Details des Rezepts anzeigen */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecipeSearch;

