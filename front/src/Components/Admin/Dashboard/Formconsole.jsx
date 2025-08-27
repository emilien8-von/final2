import React, { useState, useEffect } from 'react';

const Formconsole = ({emulateur,onSave,onCancel}) => {
    const[formData, setFormData]= useState({
      nom: "",
      brand:"",
      sortie: new Date().getFullYear(),
      emulable: 'true',
      emulateur: '',
      image:'',
      vente:'true'
    
    })
  useEffect(() => {
          if (emulateur) {
              setFormData(emulateur);
          }
      }, [emulateur]);
  
      const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData(prev => ({ ...prev, [name]: value }));
      };

       const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData)
    }

  return (
    <div className="modal-overlay">
            <div className="modal-content">
                <h2>{game ? 'Modifier le jeu' : 'Ajouter un nouveau jeu'}</h2>
                <form onSubmit={handleSubmit} className="game-form">
                    
                    {/* --- Champs Corrigés --- */}
                    <div className="form-group">
                        <label>Nom</label>
                        <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Brand</label>
                        <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Année de sortie</label>
                        <input type="number" name="annee_sortie" value={formData.annee_sortie} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>En vente </label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="oui">Oui</option>
                            <option value="non">Non</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Image de couverture (URL)</label>
                        <input type="url" name="image" value={formData.image} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Émulateur</label>
                        <input type="text" name="emulateur" value={formData.emulateur} onChange={handleChange} required />
                    </div>
                     <div className="form-group">
                        <label>Emulable</label>
                        <input type="text" name="emulateur" value={formData.emulable} onChange={handleChange} required />
                    </div>

                    {/* --- Section Galerie Corrigée --- */}
                   

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="cancel-btn">Annuler</button>
                        <button type="submit" className="save-btn">Sauvegarder</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Formconsole
