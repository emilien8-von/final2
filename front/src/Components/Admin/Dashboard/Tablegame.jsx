import React, { useState, useEffect } from 'react';
import './css/tablegame.scss'
import URLS from '../../../utils/constants/URLS.js';
import INSTANCE from '../../../utils/services/instance';
import Formgame from './Formgame.jsx';
const Tablegame = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Nouveaux états pour gérer la modale
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGame, setEditingGame] = useState(null); // null = mode ajout, objet = mode édition

    const fetchAllGames = async () => {
        try {
            setLoading(true);
            const response = await INSTANCE.get(URLS.GET_ALL_GAMES);
            setGames(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des jeux:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllGames();
    }, []);

    // 3. Logique pour la suppression
    const handleDelete = async (gameId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce jeu ? Cette action est irréversible.")) {
            try {
                await INSTANCE.delete(`${URLS.DELETE_GAME}/${gameId}`);
                fetchAllGames(); // Rafraîchir la liste après suppression
            } catch (error) {
                console.error("Erreur lors de la suppression du jeu:", error);
                alert("La suppression a échoué.");
            }
        }
    };

    // 4. Logique pour la sauvegarde (Ajout ou Modification)
    const handleSave = async (gameData) => {
        try {
            if (editingGame) {
                // Mode Modification (PUT)
                await INSTANCE.put(`${URLS.UPDATE_GAME}/${editingGame._id}`, gameData);
            } else {
                // Mode Ajout (POST)
                await INSTANCE.post(URLS.CREATE_GAME, gameData);
            }
            setIsModalOpen(false); // Fermer la modale
            setEditingGame(null); // Réinitialiser l'état d'édition
            fetchAllGames(); // Rafraîchir la liste
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du jeu:", error);
            alert("La sauvegarde a échoué.");
        }
    };

    // 5. Fonctions pour ouvrir la modale
    const openAddModal = () => {
        setEditingGame(null);
        setIsModalOpen(true);
    };

    const openEditModal = (game) => {
        setEditingGame(game);
        setIsModalOpen(true);
    };

    if (loading) {
        return <div className="loading-container">Chargement...</div>;
    }

  return (
        <div className="management-panel">
            <div className="panel-header">
                <h3>Gestion des Jeux ({games.length})</h3>
                {/* Le bouton "Ajouter" ouvre la modale en mode "ajout" */}
                <button onClick={openAddModal} className="add-button">Ajouter un jeu</button>
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
                                        {/* Le bouton "Modifier" ouvre la modale en mode "édition" */}
                                        <button onClick={() => openEditModal(game)} className="edit-btn">Modifier</button>
                                        {/* Le bouton "Supprimer" appelle la fonction de suppression */}
                                        <button onClick={() => handleDelete(game._id)} className="delete-btn">Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 6. Affichage conditionnel de la modale */}
            {isModalOpen && (
                <Formgame 
                    game={editingGame} 
                    onSave={handleSave} 
                    onCancel={() => setIsModalOpen(false)} 
                />
            )}
        </div>
  )
}

export default Tablegame

