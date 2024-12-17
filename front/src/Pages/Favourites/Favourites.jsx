import { useState, useEffect } from "react";
import Arrow from "../../assets/arrow.svg";
import Favori from "../../assets/fill.svg";
import Favori2 from "../../assets/empty.svg";
import Trash from "../../assets/trash.svg";
import HomeLink from "../../components/back/HomeLink";
import { fetchCategories } from "../../Utils/Api";
import "../Home/Home.scss";
import { Link } from "react-router-dom";
import Modal from "../../components/modal/modal";
import { v4 as uuidv4 } from 'uuid'; // Assurez-vous d'installer uuid avec npm install uuid

function Favourite({ isModalOpen, setIsModalOpen }) {
  const [recipes, setRecipes] = useState(() => {
    const storedRecipes = localStorage.getItem("recipes");
    // Ajoutez un identifiant unique si absent
    return storedRecipes 
      ? JSON.parse(storedRecipes).map(recipe => ({
          ...recipe, 
          id: recipe.id || uuidv4()
        })) 
      : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : {};
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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
    // Assurez-vous que chaque recette a un identifiant unique avant de sauvegarder
    const recipesWithIds = recipes.map(recipe => ({
      ...recipe, 
      id: recipe.id || uuidv4()
    }));
    localStorage.setItem("recipes", JSON.stringify(recipesWithIds));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addRecipe = (newRecipe) => {
    // Ajoutez un identifiant unique à la nouvelle recette
    const recipeWithId = { 
      ...newRecipe, 
      id: uuidv4() 
    };
    setRecipes((prevRecipes) => [...prevRecipes, recipeWithId]);
  };

  const toggleFavorite = (recipeId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [recipeId]: !prevFavorites[recipeId],
    }));
  };

  const deleteRecipe = (recipeId) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    setRecipes(updatedRecipes);

    const updatedFavorites = { ...favorites };
    delete updatedFavorites[recipeId];
    setFavorites(updatedFavorites);
  };

  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const filteredRecipes = recipes
    .filter((recipe) => favorites[recipe.id])
    .filter((recipe) => {
      const cuisineMatch = !selectedCuisine || recipe.types === selectedCuisine;
      const categoryMatch =
        !selectedCategory ||
        recipe.category.toString() === selectedCategory.toString();
      return cuisineMatch && categoryMatch;
    });

  const cuisineTypes = [
    "Italie",
    "Maroc",
    "Mexique",
    "Japon",
    "Espagne",
    "France",
  ];

  return (
    <main className="home">
      <div className="filter-container">
        <HomeLink />

        <button className="first" onClick={toggleFilterMenu}>
          Filtrer <img src={Arrow} alt="flèche du bas" />
        </button>

        {isFilterOpen && (
          <div className="filter-menu">
            <div className="filter-section">
              <h4>Type de cuisine</h4>
              {cuisineTypes.map((cuisine) => (
                <button
                  key={cuisine}
                  className={selectedCuisine === cuisine ? "active" : ""}
                  onClick={() =>
                    setSelectedCuisine(
                      selectedCuisine === cuisine ? "" : cuisine
                    )
                  }
                >
                  {cuisine}
                </button>
              ))}
            </div>

            <div className="filter-section">
              <h4>Catégorie</h4>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={selectedCategory === category.id ? "active" : ""}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.id ? "" : category.id
                    )
                  }
                >
                  {category.category}
                </button>
              ))}
            </div>

            <button
              className="reset-filter"
              onClick={() => {
                setSelectedCuisine("");
                setSelectedCategory("");
              }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      <div className="home__list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              {recipe.image && <img src={recipe.image} alt={recipe.title} />}
              <img
                className="fav"
                src={favorites[recipe.id] ? Favori : Favori2}
                alt="Favori"
                onClick={() => toggleFavorite(recipe.id)}
              />
              <img
                className="trash"
                src={Trash}
                alt="supprimer"
                onClick={() => deleteRecipe(recipe.id)}
              />
              <h3>{recipe.title}</h3>
              <p>Temps de préparation: {recipe.timing}</p>
              <Link to={"/details"} state={{ recipe: recipe }}>
                <button>Voir plus</button>
              </Link>
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

export default Favourite;