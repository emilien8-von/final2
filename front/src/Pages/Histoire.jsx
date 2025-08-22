// Dans Histoire.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import axios from 'axios';
import './css/histoire.scss';

const Histoire = () => {
    const { id } = useParams();
    const [consoleDetails, setConsoleDetails] = useState(null);

     useEffect(() => {
    const fetchConsoleDetails = async () => {
        try {
            // ASSUREZ-VOUS QUE CE SONT BIEN DES BACKTICKS ``
            const response = await axios.get(`http://localhost:8000/game/console/get/${id}`);
            
            if (response.status === 200) {
                setConsoleDetails(response.data);
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    // On ajoute un log pour vérifier la valeur de "id" avant l'appel
    console.log("ID de la console récupéré depuis l'URL :", id);
    
    if (id) { // On s'assure que l'id existe avant de faire l'appel
        fetchConsoleDetails();
    }
}, [id]);

  



    if (!consoleDetails) {
        return <div className="loading-container">Chargement de l'histoire de la console...</div>;
    }

    // On prépare les données pour l'infobox
    const consoleInfo = [
        { label: 'Constructeur', value: consoleDetails.brand },
        { label: 'Date de sortie', value: new Date(consoleDetails.sortie).toLocaleDateString('fr-FR') },
        { label: 'Émulable', value: consoleDetails.emulable ? 'Oui' : 'Non' },
        { label: 'Émulateur recommandé', value: consoleDetails.emulateur },
        { label: 'En vente', value: consoleDetails.vente ? 'Oui' : 'Non' },
    ];

    return (
        <div className="histoire-page-body">
            <div className="histoire-layout">

                {/* --- COLONNE PRINCIPALE (GAUCHE) --- */}
                <main className="main-content">
                    <h1>{consoleDetails.nom}</h1>
                    <p className="breadcrumb">
                        <Link to='/'>Accueil</Link> &gt; Consoles &gt; {consoleDetails.nom}
                    </p>
                    <hr className="separator" />
                    
                    {/* Vous pourrez ajouter ici une description ou une histoire plus tard */}
                    <h2>Histoire</h2>
                    <p>
                        {/* Mettez ici le champ de description de votre modèle quand vous l'aurez */}
                        Description de la console {consoleDetails.nom}... 
                        (Ce texte est un placeholder, vous pourrez le remplacer par un champ de votre base de données).
                    </p>
                </main>

                {/* --- COLONNE LATÉRALE (DROITE) - L'INFOBOX --- */}
                <aside className="sidebar">
                    <div className="sidebar-infobox">
                        <img src={consoleDetails.image} alt={`Image de la ${consoleDetails.nom}`} className="console-image" />
                        <h3 className="console-name-in-box">{consoleDetails.nom}</h3>
                        {consoleInfo.map(item => (
                            <div key={item.label} className="info-item">
                                <span className="info-label">{item.label}</span>
                                <span className="info-value">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </aside>
                
            </div>
        </div>
    );
};

export default Histoire;