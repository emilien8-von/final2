import React from 'react'
import './css/tableusers.scss'
import INSTANCE from '../../../utils/services/instance'
import URLS from '../../../utils/constants/URLS'
import { useEffect,useState } from 'react'
import Userform from './Userform'
const Tableuser = () => {
       const [users, setUsers] = useState([]);
       const [loading, setLoading] = useState(true);
    
    // 2. Nouveaux états pour gérer la modale
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);


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
     const handleRoleSave = async (userId, newRole) => {
        try {
            await INSTANCE.put(`${URLS.UPDATE_USER_ROLE}/${userId}`, { role: newRole });
            setIsModalOpen(false);
            setEditingUser(null);
            fetchAllUsers(); // Rafraîchir la liste
        } catch (error) {
            console.error("Erreur lors de la mise à jour du rôle:", error);
            alert("La mise à jour a échoué.");
        }
    };

    

      const handleForceLogout = async (userId) => {
        if (window.confirm("Voulez-vous vraiment marquer cet utilisateur comme inactif ?")) {
            try {
                // On appelle la nouvelle route
                await INSTANCE.put(`${URLS.LOGOUT_USER}/${userId}`);
                fetchAllUsers(); // On rafraîchit la liste pour voir le nouveau statut
            } catch (error) {
                console.error("Erreur:", error);
                alert("L'opération a échoué.");
            }
        }
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
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
                                     <td>
                                          <span className={`status-badge ${user.isActif ? 'status-active' : 'status-inactive'}`}>
                                            {user.isActif ? 'En ligne' : 'Hors ligne'}
                                          </span>
                                     </td>
                                    <td className="actions-cell">
                                       <button onClick={() => openEditModal(user)} className="edit-btn">Modifier Rôle</button>
                                        <button onClick={() => handleDelete(user._id)} className="delete-btn">Supprimer</button>
                                         <button onClick={() => handleForceLogout(user._id)} className="logout-btn">Déconnecter</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
             {isModalOpen && (
                <Userform 
                    user={editingUser} 
                    onSave={handleRoleSave} 
                    onCancel={() => setIsModalOpen(false)} 
                />
            )}
        </div>
  )
}

export default Tableuser
