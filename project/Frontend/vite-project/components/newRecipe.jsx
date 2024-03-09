import React, { useState } from 'react';



const NewRecipe = () => {
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    description: '', 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddRecipe = () => {
    if (!newRecipe.name || !newRecipe.description) {
      console.error('Name und Beschreibung sind erforderlich.');
      return;
    }
  
    fetch('http://localhost:5000/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRecipe)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Fehler beim Hinzufügen des neuen Rezepts');
      }
      console.log('Neues Rezept erfolgreich hinzugefügt');
    })
    .catch(error => {
      console.error(error);
    });
  };
  

  return (
    <div>
      <h2>Neues Rezept hinzufügen</h2>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={newRecipe.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Beschreibung:</label>
          <textarea name="description" value={newRecipe.description} onChange={handleInputChange}></textarea>
        </div>
        <button type="button" onClick={handleAddRecipe}>Rezept hinzufügen</button>
      </form>
    </div>
  );
}

export default NewRecipe;
