import { useState } from "react";
import './Home.scss';
import Modal from "../../components/modal/modal";

function Home({ isModalOpen, setIsModalOpen }) {
    const [recipes, setRecipes] = useState([]); // État pour les recettes

    const addRecipe = (newRecipe) => {
        setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    };

    return (
        <main className="home">
            
            
            <div className="home__list">
                {recipes.map((recipe, index) => (
                    <div key={index} className="recipe-card">
                        {recipe.image && <img src={recipe.image} alt={recipe.title} />}
                        <h3>{recipe.title}</h3>
                        <p>Temps de préparation: {recipe.timing} min</p>                        
                    </div>
                ))}
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={addRecipe} // Passe la fonction à la modale
            />
        </main>
    );
};

export default Home;