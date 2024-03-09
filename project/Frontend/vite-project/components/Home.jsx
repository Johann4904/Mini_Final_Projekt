import { Link } from "react-router-dom";

const Home = () => {
  return (
      <div>
        <nav className='nav'>
          <ul>
            <li><Link to="/recipeSearch">Rezept Suche</Link></li>
            <li><Link to="/newRecipe">Rezept einfügen</Link></li>
          </ul>
        </nav>
      </div>
  );
}

export default Home;