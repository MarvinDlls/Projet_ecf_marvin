import "../Home/Home.scss";
import { useState, useEffect } from "react";
import HomeLink from "../../components/back/HomeLink";
import Modal from "../../components/modal/modal";

function Details({ isModalOpen, setIsModalOpen }) {
  const [recipes, setRecipes] = useState(() => {
    const storedRecipes = localStorage.getItem("recipes");
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : {};
  });

  const favoriteRecipes = recipes.filter((_, index) => favorites[index]);

  const addRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const cuisineMatch = !selectedCuisine || recipe.types === selectedCuisine;
    const categoryMatch =
      !selectedCategory ||
      recipe.category.toString() === selectedCategory.toString();
    return cuisineMatch && categoryMatch;
  });

  return (
    <main className="home">
      <div className="home__list">
        <div className="filter-container">
          <HomeLink />
        </div>
        {filteredRecipes && favoriteRecipes.length > 0 ? (
          filteredRecipes &&
          favoriteRecipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              {recipe.image && <img src={recipe.image} alt={recipe.title} />}
              <img
                className="fav"
                src={favorites[index] ? Favori : Favori2}
                alt="Favori"
                onClick={() => toggleFavorite(index)}
              />
              <img
                className="trash"
                src={Trash}
                alt="supprimer"
                onClick={() => deleteRecipe(index)}
              />
              <h3>{recipe.title}</h3>
              <p>Temps de préparation: {recipe.timing}</p>
              <button>Voir plus</button>
            </div>
          ))
        ) : (
          <p>Aucune recette présente dans les favoris.</p>
        )}
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