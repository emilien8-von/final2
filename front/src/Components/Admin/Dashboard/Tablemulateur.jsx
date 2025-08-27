import './css/Dashboard.scss'
import Emulateurform from './Emulateurform'
import URLS from '../../../utils/constants/URLS'
import INSTANCE from '../../../utils/services/instance'
import { useState,useEffect } from 'react'
const Tablemulateur = () => {
     const [emulators, setEmulators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmulator, setEditingEmulator] = useState(null);

    const fetchAllEmulators = async () => {
        try {
            setLoading(true);
            const response = await INSTANCE.get(URLS.GET_EMULATEUR_ALL);
            setEmulators(response.data);
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAllEmulators(); }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet émulateur ?")) {
            try {
                await INSTANCE.delete(`${URLS.DELETE_EMULATEUR}/${id}`);
                fetchAllEmulators();
            } catch (error) {
                alert("La suppression a échoué.");
            }
        }
    };

    const handleSave = async (data) => {
        try {
            if (editingEmulator) {
                await INSTANCE.put(`${URLS.CHANGE_EMULATEUR}/${editingEmulator._id}`, data);
            } else {
                await INSTANCE.post(URLS.ADD_EMULATEUR, data);
            }
            setIsModalOpen(false);
            setEditingEmulator(null);
            fetchAllEmulators();
        } catch (error) {
            alert("La sauvegarde a échoué.");
        }
    };

    const openAddModal = () => { setEditingEmulator(null); setIsModalOpen(true); };
    const openEditModal = (emulator) => { setEditingEmulator(emulator); setIsModalOpen(true); };

    if (loading) return <div>Chargement...</div>
  return (
    <div className="management-panel">
            <div className="panel-header">
                <h3>Gestion des Émulateurs ({emulators.length})</h3>
                <button onClick={openAddModal} className="add-button">Ajouter un émulateur</button>
            </div>
            <div className="panel-body">
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Console(s) émulée(s)</th>
                                <th>Actif</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emulators.map(emu => (
                                <tr key={emu._id}>
                                    <td>{emu.nom}</td>
                                    <td>{emu.emule}</td>
                                    <td>{emu.existe ? 'Oui' : 'Non'}</td>
                                    <td className="actions-cell">
                                        <button onClick={() => openEditModal(emu)} className="edit-btn">Modifier</button>
                                        <button onClick={() => handleDelete(emu._id)} className="delete-btn">Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <Emulateurform
                    emulateurToEdit={editingEmulator}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </div>
  )
}

export default Tablemulateur
