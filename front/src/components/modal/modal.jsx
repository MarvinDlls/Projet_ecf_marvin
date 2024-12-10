import "./modal.scss";
import { fetchCategories } from "../../Utils/Api";
import { useEffect, useState } from "react";

const ModalAdd = ({ reload, isOpen, onClose, openModal }) => {
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/api/infos") // Remplace par l'URL de ton API
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
        <h2>Ajout photo</h2>
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
          <label htmlFor="category">Categorie</label>
            <select name="category" id="category">
                {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.category}
                </option>
                ))}
            </select>
        </form>
        <hr />
        <button form="test">Valider</button>
      </div>
    </div>
  );
};

export default ModalAdd;
