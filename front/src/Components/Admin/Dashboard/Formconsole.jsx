// Dans Formconsole.jsx
import React, { useState, useEffect } from 'react';

// LA CORRECTION : On accepte une prop "consoleToEdit"
const Formconsole = ({ consoleToEdit, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        nom: "",
        brand: "",
        sortie: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
        emulable: true,
        emulateur: '',
        image: '',
        vente: true
    });

    useEffect(() => {
        if (consoleToEdit) {
            // On s'assure que la date est bien formatée pour l'input type="date"
            const formattedData = {
                ...consoleToEdit,
                sortie: new Date(consoleToEdit.sortie).toISOString().split('T')[0]
            };
            setFormData(formattedData);
        }
    }, [consoleToEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // On gère les booléens pour les checkboxes/selects
        const finalValue = type === 'checkbox' ? checked : (name === 'emulable' || name === 'vente') ? value === 'true' : value;
        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{consoleToEdit ? 'Modifier la console' : 'Ajouter une nouvelle console'}</h2>
                <form onSubmit={handleSubmit} className="game-form">
                    <div className="form-group">
                        <label>Nom</label>
                        <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Marque (Brand)</label>
                        <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Date de sortie</label>
                        <input type="date" name="sortie" value={formData.sortie} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Émulable</label>
                        <select name="emulable" value={formData.emulable} onChange={handleChange}>
                            <option value={true}>Oui</option>
                            <option value={false}>Non</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Émulateur recommandé</label>
                        <input type="text" name="emulateur" value={formData.emulateur} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Image (URL)</label>
                        <input type="url" name="image" value={formData.image} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>En vente</label>
                        <select name="vente" value={formData.vente} onChange={handleChange}>
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
    );
};

export default Formconsole;