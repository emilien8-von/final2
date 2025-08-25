import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import INSTANCE from '../utils/services/instance'
import URLS from '../../utils/constants/URLS.JS';

const Dtailemulateur = () => {
  const { id } = useParams();
    const [emulatorDetails, setEmulatorDetails] = useState(null);

    useEffect(() => {
        const fetchEmulatorDetails = async () => {
            try {
                // On appelle la route que nous avons définie pour les émulateurs
                const { data, status } = await INSTANCE.get(`${URLS.GET_EMULATEUR_BY_ID}/${id}`)
                if (status === 200) {
                    setEmulatorDetails(data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de l'émulateur:", error);
            }
        };

        fetchEmulatorDetails();
    }, [id]);

    if (!emulatorDetails) {
        return <div className="loading-container">Chargement des informations de l'émulateur...</div>;
    }

    // On prépare les données pour l'infobox en se basant sur votre modèle
    const emulatorInfo = [
        { label: 'Nom', value: emulatorDetails.nom },
        { label: 'Plateforme(s)', value: emulatorDetails.plateforme }, // J'ai supposé un champ "plateforme"
        { label: 'Version', value: emulatorDetails.version }, // J'ai supposé un champ "version"
        { label: 'Site web', value: <a href={emulatorDetails.site_web} target="_blank" rel="noopener noreferrer">Visiter</a> }, // J'ai supposé un champ "site_web"
    ];

    return (
        <div className="histoire-page-body">
            <div className="histoire-layout">

                {/* --- COLONNE PRINCIPALE (GAUCHE) --- */}
                <main className="main-content">
                    <h1>{emulatorDetails.nom}</h1>
                    <p className="breadcrumb">
                        <Link to='/'>Accueil</Link> &gt; Émulateurs &gt; {emulatorDetails.nom}
                    </p>
                    <hr className="separator" />
                    
                    <h2>Description</h2>
                    <p>
                        {emulatorDetails.description || `Description de l'émulateur ${emulatorDetails.nom}...`}
                    </p>
                </main>

                {/* --- COLONNE LATÉRALE (DROITE) - L'INFOBOX --- */}
                <aside className="sidebar">
                    <div className="sidebar-infobox">
                        <img src={emulatorDetails.image} alt={`Image de ${emulatorDetails.nom}`} className="console-image" />
                        <h3 className="console-name-in-box">{emulatorDetails.nom}</h3>
                        {emulatorInfo.map(item => (
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
}

export default Dtailemulateur
