import { useState } from "react";
import { NavLink } from "react-router-dom";
import Search from '../../assets/search.svg';
import Add from '../../assets/add.svg';
import "./Navbar.scss";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <header className="header">
        <div className="header__search">
          <input
            type="text"
            placeholder="Rechercher une recette..."
            className="header__search-input"
          />
          <img src={Search} alt="logo rechercher" className="header__search-icon"/>
        </div>

        <div className="nav">
            <h1 onClick={openModal} className="title">
            Ajouter une recette
            <img src={Add} alt="bouton ajouter" className="add" /> 
            </h1>

            <nav className="navtwo">
            <NavLink to="/favoris" className="nav-link">
                Favoris
            </NavLink>
            </nav>
        </div>

      </header>

      {isModalOpen && (
        <div className="modal">
          <div className="modal__content">
            <h2>Ajouter une recette</h2>
            <form>
              <div className="modal__field">
                <label>Nom de la recette :</label>
                <input type="text" placeholder="Ex : Tarte aux pommes" />
              </div>
              <div className="modal__field">
                <label>Description :</label>
                <textarea placeholder="Décrivez votre recette ici..."></textarea>
              </div>
              <button type="submit" className="modal__button">
                Enregistrer
              </button>
              <button onClick={closeModal} className="modal__button modal__button--close">
                Annuler
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;