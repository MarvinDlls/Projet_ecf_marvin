import { useState, useEffect } from "react";
import '../Home/Home.scss';
import { useLocation } from "react-router-dom";
import HomeLink from "../../components/back/HomeLink";
import Modal from "../../components/modal/modal";
import { fetchCategories } from "../../Utils/Api";

function Details({ isModalOpen, setIsModalOpen }) {
  const location = useLocation();
  const { recipe } = location.state || {};
  const [categories, setCategories] = useState([]);

  const [recipes, setRecipes] = useState(() => {
    const storedRecipes = localStorage.getItem("recipes");
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : {};
  });

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories:", error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  if (!recipe) {
    return <div>Aucune recette sélectionnée</div>;
  }

  const parseIngredients = (ingredients) => {
    if (Array.isArray(ingredients)) return ingredients;
    if (typeof ingredients === 'string') {
      return ingredients.split(/[,\n]/).map(ing => ing.trim()).filter(ing => ing);
    }
    return [];
  };

  const parseInstructions = (instructions) => {
    if (Array.isArray(instructions)) return instructions;
    if (typeof instructions === 'string') {
      return instructions.split(/[.|\n]/).map(step => step.trim()).filter(step => step);
    }
    return [];
  };

  const recipeCategory = categories.find(
    category => category.id.toString() === recipe.category.toString()
  );

  const ingredients = parseIngredients(recipe.ingredients);
  const instructions = parseInstructions(recipe.instructions);

  return (
    <main className="home">
      <HomeLink />
      <div className="recipe-details">
        <div className="recipe-card-detail">
          {recipe.image && <img src={recipe.image} alt={recipe.title} />}
          <div className="recipe-info">
            <h2>{recipe.title}</h2>
            <p>Temps de préparation: {recipe.timing}</p>
            <p>Type de cuisine: {recipe.types}</p>
            <p>Catégorie: {recipeCategory ? recipeCategory.category : 'Non spécifiée'}</p>

            {ingredients.length > 0 && (
              <div className="ingredients">
                <h3>Ingrédients</h3>
                <ul>
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            {instructions.length > 0 && (
              <div className="instructions">
                <h3>Instructions</h3>
                <ol>
                  {instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addRecipe}
      />
    </main>
  );
}

export default Details;