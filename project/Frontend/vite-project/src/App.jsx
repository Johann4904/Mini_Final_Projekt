import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home.jsx';
import RecipeSearch from '../components/recipeSearch.jsx';
import NewRecipe from '../components/newRecipe.jsx'
import '../src/App.css'


const App = () => {
  return (
    <Router>
      <div>
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
