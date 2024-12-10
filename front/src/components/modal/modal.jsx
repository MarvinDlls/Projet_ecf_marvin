import "./modal.scss";
import { fetchCategories } from "../../Utils/Api";
import { useEffect, useState } from "react";

const ModalAdd = ({ reload, isOpen, onClose, openModal }) => {
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState();
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    category: '',
    ingredients: '',
    types: '',
    etape: '',
    timing: '',
    portions: '',
  });

  useEffect(() => {
    fetch("http://localhost:3001/api/infos") 
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des catégories:", error)
      );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formulaire soumis', formData);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClose = () => {
    onClose();
    setPreview(null);
    setFormData({
      image: null,
      title: '',
      category: '',
      ingredients: '',
      types: '',
      etape: '',
      timing: '',
      portions: '',
    });

  };

  const isFormValid = () => {
    const requiredFields = [
      'image', 
      'title', 
      'category', 
      'ingredients', 
      'types', 
      'etape', 
      'timing', 
      'portions'
    ];

    return requiredFields.every(field => {
      if (field === 'image') return formData.image !== null;
      return formData[field] && formData[field].trim() !== '';
    });
  };

  return (
    <div className={"modal" + (isOpen ? " active" : "")}>
      <div className="modal__content">
        <div className="modal__header">
            <h2>Ajout photo</h2>
            <button onClick={onClose}>X</button>
        </div>
        <form id="test" >
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
            required
          />
          <label htmlFor="title">Titre</label>
            <input 
              type="text" 
              id="title" 
              name="title"
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
              value={formData.types}
              onChange={handleInputChange}
              required
            >
              <option value="">--Choisissez un type de cuisine--</option>
              <option value="type">Italie</option>
              <option value="type">Maroc</option>
              <option value="type">Mexique</option>
              <option value="type">Japon</option>
              <option value="type">Espagne</option>
              <option value="type">France</option>
            </select>
            <label htmlFor="etapes">Étapes de préparation</label>
            <textarea 
              name="etape" 
              id="etape" 
              placeholder="Les étapes de la préparation..."
              value={formData.etape}
              onChange={handleInputChange}
              required
            ></textarea>
            <label htmlFor="timing">Temps de préparation</label>
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
        </form>
        <hr />
        <button 
          type="submit" 
          form="test"
          onSubmit={handleSubmit}
          disabled={!isFormValid()}
          className={!isFormValid() ? 'disabled' : ''}
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default ModalAdd;