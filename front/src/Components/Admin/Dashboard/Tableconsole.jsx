import React from 'react'
import INSTANCE from '../../../utils/services/instance'
import URLS from '../../../utils/constants/URLS'
import { useEffect,useState } from 'react'
import Formconsole from './Formconsole'
const Tableconsole = () => {
    const [consoles,setConsoles] = useState([])
    const [loading, setLoading] = useState(true);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [editingGame, setEditingGame] = useState(null);

    const fetchAllConsole = async () => {
        try {
            setLoading(true);
            const response = await INSTANCE.get(URLS.GET_ALL_CONSOLE);
            setConsoles(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des jeux:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        setConsoles();
    }, [])
    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce jeu ? Cette action est irréversible.")) {
            try {
                await INSTANCE.delete(`${URLS.DELETE_CONSOLE}/${id}`);
                fetchAllConsole(); // Rafraîchir la liste après suppression
            } catch (error) {
                console.error("Erreur lors de la suppression du jeu:", error);
                alert("La suppression a échoué.");
            }
        }
      }

      const handleSave = async (consoleData) => {
              try {
                  if (editingConsole) {
                      // Mode Modification (PUT)
                      await INSTANCE.put(`${URLS.CHANGE_CONSOLE}/${editingConsole._id}`, consoleData);
                  } else {
                      // Mode Ajout (POST)
                      await INSTANCE.post(URLS.ADD_CONSOLE, consoleData);
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
      
          const openEditModal = (console) => {
              setEditingGame(console);
              setIsModalOpen(true);
          };
      
          if (loading) {
              return <div className="loading-container">Chargement...</div>;
          }
      


    

  return (
    <div className="management-panel">
            <div className="panel-header">
                <h3>Gestion des Jeux ({consoles.length})</h3>
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
                            {consoles.map(console => (
                                <tr key={console._id}>
                                    <td>{console.titre}</td>
                                    <td>{console.brand}</td>
                                    <td>{console.genre}</td>
                                    <td>{console.status}</td>
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
                <Formconsole 
                    game={editingGame} 
                    onSave={handleSave} 
                    onCancel={() => setIsModalOpen(false)} 
                />
            )}
        </div>
  )
}

export default Tableconsole
