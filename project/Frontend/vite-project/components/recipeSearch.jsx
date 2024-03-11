import { useState, useEffect } from 'react';

const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSearchResults([]);
    } else if (searchTerm.length >= 3) {
      handleSearchSubmit();
    }
  }, [searchTerm]);

  const handleSearchSubmit = () => {
   
    fetch(`http://localhost:5000/recipes`, {  // API-Anfrage  Backend-Server-Endpoint senden
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

      setSearchResults([]);// Vor dem Hinzufügen neuer Suchergebnisse das Array leeren

      const filteredRecipes = recipeData.filter(recipe =>
        (recipe.title && recipe.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setSearchResults(filteredRecipes);
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleDeleteSearchResult = async () => {
    try {
      for (const recipe of searchResults) {
        const response = await fetch(`http://localhost:5000/recipes/${recipe.title}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Fehler beim Löschen des Rezepts');
        }
      }
      // Rezepte aus Suchergebnissen löschen
      setSearchResults([]);
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
      <button type="submit">Suche</button>
      {searchResults.length > 0 && (
        <button onClick={handleDeleteSearchResult}>Löschen</button>
      )}
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