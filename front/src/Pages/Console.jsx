import React from 'react'
import { useEffect,useState } from 'react'
import './css/console.scss'
import { Link } from 'react-router'
import INSTANCE from '../utils/constants/INSTANCE'
import URLS from '../utils/constants/URLS.JS'

const Console = () => {
  const [consoles, setConsoles] = useState([]);
      const [loading, setLoading] = useState(true);
  
      useEffect(() => {
          const fetchGames = async () => {
              try {
                  const response = await INSTANCE.get(`${URLS.GET_ALL_CONSOLE}`)
                  setConsoles(response.data);
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
                <h1>Liste des Consoles</h1>
                <div className="image-grid">
                    {consoles.map(console => (
                        <Link to={`/histoire/${console._id}`} key={console._id} className="grid-item-link">
                            <div className="image-card">
                                <img src={console.image} alt={console.titre} />
                                <div className="card-overlay">
                                    <h3>{console.titre}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
  )
}

export default Console
