import React, { useState } from 'react';



const NewRecipe = () => {
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    description: '', 
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRecipe(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddRecipe = () => {
    if (!newRecipe.title || !newRecipe.description) {
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
    <div className='box box-newRcipe'>
      <a href="/">Home</a>
      <h2>Neues Rezept hinzufügen</h2>
      <form>
        <div className='boxName'>
          <h4>Titel:</h4>
          <input type="text" name="title" value={newRecipe.title} onChange={handleInputChange} />
        </div>
        <div className='boxBeschreibung'>
          <h4>Beschreibung:</h4>
          <textarea name="description" value={newRecipe.description} onChange={handleInputChange}></textarea>
        </div>
        <button type="button" onClick={handleAddRecipe}>hinzufügen</button>
      </form>
    </div>
  );
}

export default NewRecipe;
