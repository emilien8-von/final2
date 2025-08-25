import React from 'react'
import React, { useState, useEffect } from 'react';
import './css/tablegame.scss'
import INSTANCE from '../utils/services/instance'
import URLS from '../../../utils/constants/URLS.JS';
const Tablegame = () => {
  const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllGames = async () => {
            try {
                const response = await INSTANCE.get(`${URLS.GET_ALL_GAMES}`)
                setGames(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération de tous les jeux:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllGames();
    }, []);

    if (loading) {
        return <div className="loading-container">Chargement de la liste des jeux...</div>;
    }

  return (
    <div className="management-panel">
            <div className="panel-header">
                <h3>Gestion des Jeux ({games.length})</h3>
                <button className="add-button">Ajouter un jeu</button>
            </div>
            <div className="panel-body">
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Développeur</th>
                                <th>Genre</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map(game => (
                                <tr key={game._id}>
                                    <td>{game.titre}</td>
                                    <td>{game.brand}</td>
                                    <td>{game.genre}</td>
                                    <td>{game.status}</td>
                                    <td className="actions-cell">
                                        <button className="edit-btn">Modifier</button>
                                        <button className="delete-btn">Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  )
}

export default Tablegame

