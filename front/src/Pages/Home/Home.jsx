import { useState } from "react";
import './Home.scss';
import Arrow from '../../assets/arrow.svg';
import Modal from "../../components/modal/modal";

function Home({ isModalOpen, setIsModalOpen }) {
    const [recipes, setRecipes] = useState([]);

    const addRecipe = (newRecipe) => {
        setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    };

    return (
        <main className="home">
            
            <button className="first">Filtrer <img src={Arrow} alt="flèche du bas" /></button>
            <div className="home__list">
                {recipes.map((recipe, index) => (
                    <div key={index} className="recipe-card">
                        {recipe.image && <img src={recipe.image} alt={recipe.title} />}
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