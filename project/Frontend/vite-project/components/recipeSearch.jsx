import React, { useState, useEffect } from 'react';

const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm.length >= 3) {
      handleSearchSubmit();
    }
  }, [searchTerm]);

  const handleSearchSubmit = () => {
   
    fetch(`http://localhost:5000/recipes`, {  // API-Anfrage an deine Backend-Server-Endpoint senden
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
      const filteredRecipes = recipeData.filter(recipe =>
        (recipe.title && recipe.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (recipe.description && recipe.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setSearchResults(filteredRecipes);
    })
    .catch(error => {
      console.error(error);
    });
  };
  
  return (
    <div className='box box-search'>
      <a href="/">Home</a>
      <h2>Rezeptsuche</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }}>
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
                <h4>{recipe.title}</h4>
                <p>{recipe.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecipeSearch;