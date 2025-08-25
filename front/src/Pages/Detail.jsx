// Dans Detail.jsx
import React, { useEffect, useState, useContext } from 'react';
import './css/detail.scss';
import { Link, useParams } from 'react-router';
import Comments from './Comments';
import { Context } from '../utils/context/Context';
import URLS from '../utils/constants/URLS';
import INSTANCE from '../utils/services/instance';


const Detail = () => {
    const { id } = useParams();
    const { auth } = useContext(Context); // Récupérer l'utilisateur connecté
    const [details, setDetails] = useState(null); // Initialiser à null

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const { data, status } = await INSTANCE.get(`${URLS.GET_GAME_BY_ID}/${id}`)
                if (status === 200) {
                    setDetails(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchDetail();
    }, [id]); // Se redéclenche si l'ID du jeu change

  
    if (!details) {
        return <div className="loading-container">Chargement des détails du jeu...</div>;
    }

    const gameCharacteristics = [
        { label: 'Développeur', value: details.brand },
        { label: 'Franchise', value: details.franchise },
        { label: 'Date de sortie', value: details.annee_sortie },
        { label: 'Genre', value: details.genre },
        { label: 'Exclusivité', value: details.exclusivite },
        { label: 'Disponible sur', value: details.disponible },
        { label: 'Émulateur', value: details.emulateur },
        { label: 'Multijoueur', value: details.multijoueur },
        { label: 'Joueurs max', value: details.nombre_de_joueur },
        { label: 'En ligne', value: details.online },
        { label: 'En vente ?', value: details.status },
    ];

    return (
        <div className='detail-page-body'>
            <div className="detail-page-layout">
                
                {/* --- COLONNE PRINCIPALE (GAUCHE) --- */}
                <main className="main-content">
                    <h1>{details.titre}</h1>
                    <p className="breadcrumb">
                        <Link to='/'>Accueil</Link> &gt; {details.titre}
                    </p>

                    <hr className="separator" />

                    <h2>Description</h2>
                    <p className="description">{details.description}</p>

                    <hr className="separator" />

                    <h2>Galerie</h2>
                    <div className='gallery-grid'>
                        {/* On filtre pour n'afficher que les images qui existent */}
                        {Object.values(details.gallery).filter(img => img).map((imgUrl, index) => (
                            <div key={index} className="gallery-item">
                                <img src={imgUrl} alt={`Screenshot ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <hr className="separator" />

                    <h2>Note et commentaires</h2>
                    <Comments gameId={id} />
                </main>

                {/* --- COLONNE LATÉRALE (DROITE) --- */}
                <aside className="sidebar">
                    <img className='sidebar-cover-image' src={details.image} alt={`Couverture de ${details.titre}`} />
                    <div className="game-info-box">
                        <h3>Caractéristiques</h3>
                        {gameCharacteristics.map(item => (
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

export default Detail;