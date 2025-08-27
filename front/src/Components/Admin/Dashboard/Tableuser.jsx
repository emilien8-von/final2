import React from 'react'
import './css/tableusers.scss'
import INSTANCE from '../../../utils/services/instance'
import URLS from '../../../utils/constants/URLS'
import { useEffect,useState } from 'react'

const Tableuser = () => {
      const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fonction pour récupérer tous les utilisateurs
    const fetchAllUsers = async () => {
        try {
            setLoading(true);
            const response = await INSTANCE.get(URLS.GET_ALL_USERS); // On aura besoin de cette constante
            setUsers(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
        } finally {
            setLoading(false);
        }
    };

    // On appelle la fonction au premier chargement du composant
    useEffect(() => {
        fetchAllUsers();
    }, []);

    // Logique pour la suppression d'un utilisateur
    const handleDelete = async (userId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.")) {
            try {
                await INSTANCE.delete(`${URLS.DELETE_USER}/${userId}`);
                fetchAllUsers(); // On rafraîchit la liste
            } catch (error) {
                console.error("Erreur lors de la suppression de l'utilisateur:", error);
                alert("La suppression a échoué.");
            }
        }
    };

    if (loading) {
        return <div className="loading-container">Chargement de la liste des utilisateurs...</div>;
    }
  return (
   <div className="management-panel">
            <div className="panel-header">
                <h3>Gestion des Utilisateurs ({users.length})</h3>
                {/* On pourra ajouter un bouton "Ajouter un admin" plus tard si besoin */}
            </div>
            <div className="panel-body">
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Pseudo</th>
                                <th>Email</th>
                                <th>Rôle</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>
                                        <img src={user.avatar} alt={`Avatar de ${user.pseudo}`} className="table-avatar" referrerPolicy="no-referrer" />
                                    </td>
                                    <td>{user.pseudo}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td className="actions-cell">
                                        <button className="edit-btn">Modifier Rôle</button>
                                        <button onClick={() => handleDelete(user._id)} className="delete-btn">Supprimer</button>
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

export default Tableuser
