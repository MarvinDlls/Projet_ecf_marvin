import { useState, useEffect } from "react";
import { fetchCategories } from '../../Utils/Api';
import './modal.scss';

export default function Modal({ isOpen, onClose, onSubmit }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    category: "",
    ingredients: "",
    types: "",
    etape: "",
    timing: "",
    portions: "",
    advice: ""
  });

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories:", error);
        setError("Impossible de charger les catégories");
      });
  }, []);

  useEffect(() => {
    if (formData.image) {
      const imageURL = URL.createObjectURL(formData.image);
      setPreview(imageURL);

      return () => {
        URL.revokeObjectURL(imageURL); 
      };
    }
  }, [formData.image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; 
        const newRecipe = {
          ...formData,
          image: base64Image, 
        };
        
        localStorage.setItem('recipeImage', base64Image);

        onSubmit(newRecipe);
        handleClose();
      };
      reader.readAsDataURL(formData.image); 
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 4 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        alert("Seuls les fichiers JPG et PNG sont autorisés");
        return;
      }

      if (file.size > maxSize) {
        alert("La taille du fichier ne doit pas dépasser 4 Mo");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClose = () => {
    setPreview(null);
    setFormData({
      image: null,
      title: "",
      category: "",
      ingredients: "",
      types: "",
      etape: "",
      timing: "",
      portions: "",
      advice: ""
    });
    onClose();
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  const isFormValid = () => {
    const requiredFields = [
      "image",
      "title",
      "category",
      "ingredients",
      "types",
      "etape",
      "timing",
      "portions",
    ];

    return requiredFields.every((field) => {
      if (field === "image") return formData.image !== null;
      return formData[field] && formData[field].trim() !== "";
    });
  };

  return (
    <div className={"modal-overlay" + (isOpen ? " active" : "")} onClick={handleOutsideClick}>
      <div className="modal-content">
        <div className="modal__header">
          <h2>Ajouter une recette</h2>
          <p onClick={handleClose}>X</p>
        </div>

        <form id="test" onSubmit={handleSubmit}>
          <div className="preview">
            {preview ? (
              <img src={preview} alt="preview" />
            ) : (
              <>
                <img src={"/placeholder.svg"} alt="placeholder" />
                <label htmlFor="image">+ ajouter photo</label>
                <span>jpg, png : 4mo max</span>
              </>
            )}
          </div>

          <input 
            type="file" 
            id="image"
            name="image"
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png"
            required  
          />

          {error && <div className="error">{error}</div>}

          <label htmlFor="title">Titre</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            value={formData.title}
            onChange={handleInputChange}
            required 
          />

          <label htmlFor="category">Catégories</label>
          <select 
            name="category" 
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">--Choisissez une catégorie--</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>

          <label htmlFor="ingredients">Liste des ingrédients</label>
          <input 
            type="text" 
            id="ingredients" 
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            required 
          />

          <label htmlFor="types">Type de cuisine</label>
          <select 
            name="types" 
            id="types"
            value={formData.types}
            onChange={handleInputChange}
            required
          >
            <option value="">--Choisissez un type de cuisine--</option>
            <option value="Italie">Italien</option>
            <option value="Maroc">Maroc</option>
            <option value="Mexique">Mexique</option>
            <option value="Japon">Japon</option>
            <option value="Espagne">Espagne</option>
            <option value="France">France</option>
          </select>

          <label htmlFor="etape">Étapes de préparation</label>
          <textarea 
            name="etape" 
            id="etape" 
            placeholder="Les étapes de la préparation..."
            value={formData.etape}
            onChange={handleInputChange}
            required
          ></textarea>

          <label htmlFor="timing">Temps de préparation (en heures)</label>
          <input 
            type="time" 
            name="timing" 
            id="timing"
            value={formData.timing}
            onChange={handleInputChange}
            required 
          />

          <label htmlFor="portions">Nombre de portions</label>
          <input 
            type="text" 
            name="portions" 
            id="portions"
            min="1"
            value={formData.portions}
            onChange={handleInputChange}
            required 
          />

          <label htmlFor="advice">Conseils de cuisine (facultatif)</label>
          <input 
            type="text" 
            name="advice" 
            id="advice"
            value={formData.advice || ''}
            onChange={handleInputChange}
          />

          <hr />
          <button 
            type="submit"
            disabled={!isFormValid()}
            className={!isFormValid() ? 'disabled' : ''}
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}