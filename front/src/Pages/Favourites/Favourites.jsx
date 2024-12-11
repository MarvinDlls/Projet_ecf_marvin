import { useState, useEffect } from "react";
import Arrow from "../../assets/arrow.svg";
import Favori from "../../assets/fill.svg";
import Favori2 from "../../assets/empty.svg";
import Trash from "../../assets/trash.svg";
import Back from '../../assets/back.svg';
import { fetchCategories } from "../../Utils/Api";
import '../Home/Home.scss';
import { Link } from "react-router-dom";
import Modal from "../../components/modal/modal";

function Favourite ({isModalOpen, setIsModalOpen}) {
    const [recipes, setRecipes] = useState(() => {
        const storedRecipes = localStorage.getItem("recipes");
        return storedRecipes ? JSON.parse(storedRecipes) : [];
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
        localStorage.setItem("recipes", JSON.stringify(recipes));
      }, [recipes]);
    
      useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }, [favorites]);
    
      const addRecipe = (newRecipe) => {
        setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
      };
    
      const favoriteRecipes = recipes.filter((_, index) => favorites[index]);

      const toggleFavorite = (index) => {
        setFavorites((prevFavorites) => ({
          ...prevFavorites,
          [index]: !prevFavorites[index],
        }));
      };
    
      const deleteRecipe = (indexToRemove) => {
        const updatedRecipes = recipes.filter(
          (_, index) => index !== indexToRemove
        );
        setRecipes(updatedRecipes);
    
        const updatedFavorites = { ...favorites };
        delete updatedFavorites[indexToRemove];
        setFavorites(updatedFavorites);
      };
    
      const toggleFilterMenu = () => {
        setIsFilterOpen(!isFilterOpen);
      };
    
      const filteredRecipes = recipes.filter((recipe) => {
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

    return(
        <main className="home">
      <div className="filter-container">

        <Link to={'/'}>
        <img className="icon" src={Back} alt="retour home" />
        </Link>

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
        {filteredRecipes && favoriteRecipes.length > 0 ? (
          filteredRecipes && favoriteRecipes.map((recipe, index) => (
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
    )
}

export default Favourite;