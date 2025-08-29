import React from 'react'
import INSTANCE from '../../../utils/services/instance'
import URLS from '../../../utils/constants/URLS'
import { useEffect,useState } from 'react'
import Formconsole from './Formconsole'
const Tableconsole = () => {
   const [consoles, setConsoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingConsole, setEditingConsole] = useState(null);

    const fetchAllConsoles = async () => {
        try {
            setLoading(true);
            const response = await INSTANCE.get(URLS.GET_ALL_CONSOLE);
            setConsoles(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des consoles:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllConsoles(); 
    }, []);

    const handleDelete = async (consoleId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette console ?")) {
            try {
                await INSTANCE.delete(`${URLS.DELETE_CONSOLE}/${consoleId}`);
                fetchAllConsoles();
            } catch (error) {
                console.error("Erreur lors de la suppression:", error);
                alert("La suppression a échoué.");
            }
        }
    };

    const handleSave = async (consoleData) => {
        try {
            if (editingConsole) {
                await INSTANCE.put(`${URLS.CHANGE_CONSOLE}/${editingConsole._id}`, consoleData);
            } else {
                await INSTANCE.post(URLS.ADD_CONSOLE, consoleData);
            }
            setIsModalOpen(false);
            setEditingConsole(null);
            fetchAllConsoles();
        } catch (error) {
            console.error("Erreur lors de la sauvegarde:", error);
            alert("La sauvegarde a échoué.");
        }
    };

    const openAddModal = () => {
        setEditingConsole(null);
        setIsModalOpen(true);
    };

    const openEditModal = (console) => {
        setEditingConsole(console);
        setIsModalOpen(true);
    };

    if (loading) return <div>Chargement...</div>;


    

  return (
        <div className="management-panel">
            <div className="panel-header">
                <h3>Gestion des Consoles ({consoles.length})</h3>
                <button onClick={openAddModal} className="add-button">Ajouter une console</button>
            </div>
            <div className="panel-body">
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Marque</th>
                                <th>Sortie</th>
                                <th>Émulable</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consoles.map(c => ( // On utilise "c" pour éviter le conflit avec "console"
                                <tr key={c._id}>
                                    <td>{c.nom}</td>
                                    <td>{c.brand}</td>
                                    <td>{new Date(c.sortie).toLocaleDateString('fr-FR')}</td>
                                    <td>{c.emulable ? 'Oui' : 'Non'}</td>
                                    <td className="actions-cell">
                                        <button onClick={() => openEditModal(c)} className="edit-btn">Modifier</button>
                                        <button onClick={() => handleDelete(c._id)} className="delete-btn">Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <Formconsole 
                    consoleToEdit={editingConsole} 
                    onSave={handleSave} 
                    onCancel={() => setIsModalOpen(false)} 
                />
            )}
        </div>
  )
}

export default Tableconsole
