import React from 'react'
import { useEffect,useState } from 'react'
import './css/game.scss'
import { Link } from 'react-router'
import API from '../utils/constants/Api'
import URLS from '../utils/constants/URLS.JS'

const Game = () => {
     const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                // On appelle la route du backend qui renvoie tous les jeux
                const response = await API.get(`${URLS.GET_ALL_GAMES}`)
                setGames(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des jeux:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (loading) {
        return <div className="loading-container">Chargement des jeux...</div>;
    }

    return (
        <div className="list-page-container">
            <h1>Liste des Jeux</h1>
            <div className="image-grid">
                {games.map(game => (
                    <Link to={`/detail/${game._id}`} key={game._id} className="grid-item-link">
                        <div className="image-card">
                            <img src={game.image} alt={game.titre} />
                            <div className="card-overlay">
                                <h3>{game.titre}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Game
