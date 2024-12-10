import "./modal.scss";
import { fetchCategories } from "../../Utils/Api";
import { useEffect, useState } from "react";

const ModalAdd = ({ reload, isOpen, onClose, openModal }) => {
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/api/infos") 
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des catégories:", error)
      );
  }, []);

  const getCategories = async (e) => {
    const data = await fetchCategories();
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
  };

  const handleClose = () => {
    onClose();
    setPreview();
  };

  return (
    <div className={"modal" + (isOpen ? " active" : "")}>
      <div className="modal__content">
        <div className="modal__header">
            <h2>Ajout photo</h2>
            <h1>X</h1>
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
          />
          <label htmlFor="title">Titre</label>
            <input type="text" id="title" name="title" />
          <label htmlFor="category">Catégories</label>
            <select name="category" id="category">
                {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.category}
                </option>
                ))}
            </select>
            <label htmlFor="ingredients">Liste des ingrédients</label>
                <input type="text" id="ingredients" name="ingredients" />
            <label htmlFor="types">Type de cuisine</label>
                <select name="types">
                    <option value="">--Choisissez un type de cuisine--</option>
                    <option value="type">Italie</option>
                    <option value="type">Maroc</option>
                    <option value="type">Mexique</option>
                    <option value="type">Japon</option>
                    <option value="type">Espagne</option>
                    <option value="type">France</option>
                </select>
            <label htmlFor="etapes">Étapes de préparation</label>
                <textarea name="etape" id="etape" placeholder="Les étapes de la préparation..."></textarea>
            <label htmlFor="timing">Temps de préparation</label>
                <input type="time" name="timing" id="timing" />
            <label htmlFor="portions">Nombre de portions</label>
                <input type="text" name="porttions" id="portions" />
            <label htmlFor="advice">Conseils de cuisine (facultatif)</label>
                <input type="text" name="advice" id="advice" />
        </form>
        <hr />
        <button form="test">Valider</button>
      </div>
    </div>
  );
};

export default ModalAdd;
