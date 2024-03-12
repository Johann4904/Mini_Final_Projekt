import { Link } from "react-router-dom";

const Home = () => {
  return (
      <div className="box">
         <h1>Koch-Rezept Manager</h1>
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