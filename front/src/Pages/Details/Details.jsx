import { useState, useEffect } from "react";
import "../Home/Home.scss";
import { useLocation } from "react-router-dom";
import HomeLink from "../../components/back/HomeLink";
import Modal from "../../components/modal/modal";
import { fetchCategories } from "../../Utils/Api";
import "./Details.scss";

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
    if (typeof ingredients === "string") {
      return ingredients
        .split(/[,\n]/)
        .map((ing) => ing.trim())
        .filter((ing) => ing);
    }
    return [];
  };

  const parseEtape = (etapes) => {
    if (Array.isArray(etapes)) return etapes;
    if (typeof etapes === "string") {
      return etapes
        .split(/[.|\n]/)
        .map((step) => step.trim())
        .filter((step) => step);
    }
    return [];
  };

  const parsePortions = (portion) => {
    if (Array.isArray(portion)) return etapes;
    if (typeof portion === "string") {
      return portion
        .split(/[.|\n]/)
        .map((step) => step.trim())
        .filter((step) => step);
    }
    return [];
  };

  const recipeCategory = categories.find(
    (category) => category.id.toString() === recipe.category.toString()
  );

  const portions = parsePortions(recipe.portion);
  const ingredients = parseIngredients(recipe.ingredients);
  const etape = parseEtape(recipe.etape);

  return (
    <main className="detail">
      <HomeLink />
      <div className="detail__list">
        <div className="detail-card">
          <h1 className="titre">{recipe.title}</h1>
          {recipe.image && (
            <img className="image" src={recipe.image} alt={recipe.title} />
          )}
          <div className="details-info">
            <p>
              Type de cuisine: <span className="type">{recipe.types}</span>
            </p>
            <p>
              Catégorie:{" "}
              <span className="categorie">
                {recipeCategory ? recipeCategory.category : "Non spécifiée"}
              </span>
            </p>

            {ingredients.length > 0 && (
              <div className="ingredients">
                <p>Ingrédients:</p>
                <ul>
                  {ingredients.map((ingredient, index) => (
                    <li className="ingredient" key={index}>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {etape.length > 0 && (
              <div className="instructions">
                <p>Étapes:</p>
                <ul>
                  {etape.map((step, index) => (
                    <li className="etape" key={index}>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p>
              Temps de préparation:{" "}
              <span className="timing">{recipe.timing}</span>
            </p>
            <p>
              Portions: <span className="portion">{recipe.portions}</span>
            </p>
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