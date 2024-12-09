import { useState } from "react";
import { NavLink } from "react-router-dom";
import Search from '../../assets/search.svg';
import Add from '../../assets/add.svg';
import "./Navbar.scss";
import Modal from "../modal/modal";

const Navbar = ({ openModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
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
        <h1 className="title" onClick={openModal}>
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
    );
  };

export default Navbar;