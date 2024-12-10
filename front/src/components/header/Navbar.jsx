import { useState } from "react";
import { NavLink } from "react-router-dom";
import Search from '../../assets/search.svg';
import Add from '../../assets/add.svg';
import "./Navbar.scss";
import ModalAdd from "../../components/modal/modal";

const Navbar = () => {
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);

  const handleOpenModal2 = () => {
    setIsOpenModal2(true);
  };

  const handleCloseModal2 = () => {
    setIsOpenModal2(false);
  };

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
            <h1 className="title" onClick={setIsOpenModal2}>
            Ajouter une recette
            <img src={Add} alt="bouton ajouter" className="add" /> 
            <ModalAdd  isOpen={isOpenModal2} onClose={() => setIsOpenModal2(false)} openModal1={() => setIsOpenModal1(true)}  />
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