import React, { useState, useEffect } from 'react';

import './css/fjeux.scss'
const Formgame = ({ game, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        brand: '',
        franchise: '',
        genre: 'Action',
        annee_sortie: new Date().getFullYear(),
        status: 'oui',
        image: '',
        rating:'',
        exclusivite:'',
        online:'',
        multijoueur:'',
        nombre_de_joueur:'',
        disponible:'',
        emulateur:'',
        gallery: {
            img : '',
            img2:'',
            img3:'',
            img4:'',
            img5:'',
            img6:''
        }
    });

    // Si on passe un jeu en prop (mode édition), on pré-remplit le formulaire
    useEffect(() => {
        if (game) {
            setFormData(game);
        }
    }, [game]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGalleryChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            gallery: {
                ...prev.gallery,
                [name]: value
            }
        }));
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
                        <label>Titre</label>
                        <input type="text" name="titre" value={formData.titre} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Développeur (Brand)</label>
                        <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Franchise</label>
                        <input type="text" name="franchise" value={formData.franchise} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Genre</label>
                        <select name="genre" value={formData.genre} onChange={handleChange}>
                            <option value="Action">Action</option>
                            <option value="Platforme">Platforme</option>
                            <option value="Sports">Sports</option>
                            <option value="Combats">Combats</option>
                            <option value="Course">Course</option>
                            <option value="RPG">RPG</option>
                            <option value="open world">Open World</option>
                            <option value="beat them all">Beat Them All</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Année de sortie</label>
                        <input type="number" name="annee_sortie" value={formData.annee_sortie} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>En vente (Status)</label>
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
                        <label>Note (Rating)</label>
                        <input type="number" name="rating" value={formData.rating} min="0" max="5" step="0.1" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Exclusivité</label>
                        <select name="exclusivite" value={formData.exclusivite} onChange={handleChange}>
                            <option value="oui">Oui</option>
                            <option value="non">Non</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>En ligne</label>
                        <select name="online" value={formData.online} onChange={handleChange}>
                            <option value="oui">Oui</option>
                            <option value="non">Non</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Multijoueur</label>
                        <select name="multijoueur" value={formData.multijoueur} onChange={handleChange}>
                            <option value="oui">Oui</option>
                            <option value="non">Non</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Nombre de joueurs max</label>
                        <input type="number" name="nombre_de_joueur" value={formData.nombre_de_joueur} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Disponible sur</label>
                        <input type="text" name="disponible" value={formData.disponible} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Émulateur</label>
                        <input type="text" name="emulateur" value={formData.emulateur} onChange={handleChange} required />
                    </div>

                    {/* --- Section Galerie Corrigée --- */}
                    <h3 className="form-subtitle">Galerie (URLs)</h3>
                    <div className="form-group">
                        <label>Image 1</label>
                        <input type="url" name="img" value={formData.gallery.img} onChange={handleGalleryChange} />
                    </div>
                    <div className="form-group">
                        <label>Image 2</label>
                        <input type="url" name="img2" value={formData.gallery.img2} onChange={handleGalleryChange} />
                    </div>
                    <div className="form-group">
                        <label>Image 3</label>
                        <input type="url" name="img3" value={formData.gallery.img3} onChange={handleGalleryChange} />
                    </div>
                    <div className="form-group">
                        <label>Image 4</label>
                        <input type="url" name="img4" value={formData.gallery.img4} onChange={handleGalleryChange} />
                    </div>
                    <div className="form-group">
                        <label>Image 5</label>
                        <input type="url" name="img5" value={formData.gallery.img5} onChange={handleGalleryChange} />
                    </div>
                    <div className="form-group">
                        <label>Image 6</label>
                        <input type="url" name="img6" value={formData.gallery.img6} onChange={handleGalleryChange} />
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

export default Formgame
