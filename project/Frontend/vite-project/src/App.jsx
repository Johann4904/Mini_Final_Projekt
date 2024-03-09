import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home.jsx';
import RecipeSearch from '../components/recipeSearch.jsx';
import NewRecipe from '../components/newRecipe.jsx'



const App = () => {
  return (
    <Router>
      <div>
        <h1>Rezept Manager</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipeSearch" element={<RecipeSearch />} />
          <Route path="/newRecipe" element={<NewRecipe />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
