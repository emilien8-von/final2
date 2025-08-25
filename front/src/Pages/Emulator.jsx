import React from 'react'
import { useEffect,useState } from 'react'
import INSTANCE from '../utils/services/instance'
import URLS from '../utils/constants/URLS';
import './css/emulator.scss'
import { Link } from 'react-router'


const Emulator = () => {
  const [emulator, setEmulator] = useState([]);
        const [loading, setLoading] = useState(true);
    
        useEffect(() => {
            const fetchGames = async () => {
                try {
                    const response = await INSTANCE.get(`${URLS.GET_EMULATEUR_ALL}`)
                    setEmulator(response.data);
                } catch (error) {
                    console.error("Erreur lors de la récupération des consoles:", error);
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
                <h1>Liste des Emulateur</h1>
                <div className="image-grid">
                    {emulator.map(emulator => (
                        <Link to={`/emulation/${emulator._id}`} key={emulator._id} className="grid-item-link">
                            <div className="image-card">
                                <img src={emulator.image} alt={emulator.nom} />
                                <div className="card-overlay">
                                    <h3>{emulator.titre}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
  )
}

export default Emulator
