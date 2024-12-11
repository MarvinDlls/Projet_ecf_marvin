import { useState } from "react";
import './Home.scss';
import Arrow from '../../assets/arrow.svg';
import Favori from '../../assets/fill.svg';
import Favori2 from '../../assets/empty.svg';
import Modal from "../../components/modal/modal";

function Home({ isModalOpen, setIsModalOpen }) {
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState({}); // Gère les favoris (key: index, value: boolean)

    const addRecipe = (newRecipe) => {
        setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    };

    const toggleFavorite = (index) => {
        setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [index]: !prevFavorites[index], // Alterne le statut du favori
        }));
    };

    return (
        <main className="home">
            <button className="first">Filtrer <img src={Arrow} alt="flèche du bas" /></button>
            <div className="home__list">
                {recipes.map((recipe, index) => (
                    <div key={index} className="recipe-card">
                        {recipe.image && <img src={recipe.image} alt={recipe.title} />}
                        <img 
                            className="fav" 
                            src={favorites[index] ? Favori : Favori2} 
                            alt="Favori" 
                            onClick={() => toggleFavorite(index)}
                        />
                        <h3>{recipe.title}</h3>
                        <p>Temps de préparation: {recipe.timing}</p>
                        <button>Voir plus</button>                        
                    </div>
                ))}
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={addRecipe}
            />
        </main>
    );
};

export default Home;