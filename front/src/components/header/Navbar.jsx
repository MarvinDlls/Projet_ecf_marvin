import { useState } from "react";
import { NavLink } from "react-router-dom";
import Search from "../../assets/search.svg";
import Add from "../../assets/add.svg";
import "./Navbar.scss";

const Navbar = ({ openModal, recipes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 3) {
      const results = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <header className="header">
      <div className="header__search">
        <input
          type="text"
          placeholder="Rechercher une recette..."
          className="header__search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        <img
          src={Search}
          alt="logo rechercher"
          className="header__search-icon"
        />
        
        {searchTerm.length >= 3 && (
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((recipe) => (
                <div key={recipe.id} className="search-result-item">
                  <p>{recipe.title}</p>
                </div>
              ))
            ) : (
              <div className="no-results">Aucune recette disponible</div>
            )}
          </div>
        )}
      </div>

      <div className="nav">
        <h1 className="title" onClick={openModal}>
          Ajouter une recette
          <img src={Add} alt="bouton ajouter" className="add" />
        </h1>

        <nav className="navtwo">
          <NavLink
            to="/favoris"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Favoris
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;