import React, { useState, useEffect } from 'react';


const Emulateurform = ({ emulateurToEdit, onSave, onCancel }) => {
 const [formData, setFormData] = useState({
        nom: "",
        image: "",
        emule: "",
        sortie: new Date().toISOString().split('T')[0],
        existe: true
    });

    useEffect(() => {
        if (emulateurToEdit) {
            const formattedData = {
                ...emulateurToEdit,
                sortie: new Date(emulateurToEdit.sortie).toISOString().split('T')[0]
            };
            setFormData(formattedData);
        }
    }, [emulateurToEdit]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'select-one' ? value === 'true' : value;
        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    }
  return (
    <div className="modal-overlay">
            <div className="modal-content">
                <h2>{emulateurToEdit ? 'Modifier l\'émulateur' : 'Ajouter un émulateur'}</h2>
                <form onSubmit={handleSubmit} className="game-form">
                    <div className="form-group">
                        <label>Nom</label>
                        <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Image (URL)</label>
                        <input type="url" name="image" value={formData.image} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Console(s) émulée(s)</label>
                        <input type="text" name="emule" value={formData.emule} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Date de sortie</label>
                        <input type="date" name="sortie" value={formData.sortie} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Toujours actif ?</label>
                        <select name="existe" value={formData.existe} onChange={handleChange}>
                            <option value={true}>Oui</option>
                            <option value={false}>Non</option>
                        </select>
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="cancel-btn">Annuler</button>
                        <button type="submit" className="save-btn">Sauvegarder</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Emulateurform
