import { useState } from "react";
import './modal.scss';

export default function Modal({ isOpen, onClose }) {   
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        {/* Contenu de votre modal */}
        <h2>Ajouter une recette</h2>
        
        {/* Formulaire ou autres éléments */}
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}