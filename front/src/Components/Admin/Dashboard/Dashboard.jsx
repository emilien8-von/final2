import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../../utils/context/Context';
import URLS from '../../../utils/constants/URLS';
import './css/Dashboard.scss';
import INSTANCE from '../../../utils/services/instance';
import { Link } from 'react-router';

const Dashboard = () => {
    const { auth } = useContext(Context);
    const [recentGames, setRecentGames] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // État pour la date et l'heure
    const [currentTime, setCurrentTime] = useState(new Date());

    // Effet pour récupérer les données du dashboard
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [recentGamesResponse] = await Promise.all([
                    INSTANCE.get(URLS.GET_RECENT_GAMES)
                ]);
                
                setRecentGames(recentGamesResponse.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données du dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Effet pour mettre à jour l'heure chaque seconde
    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    if (loading) {
        return <div className="loading-container">Chargement du Dashboard...</div>;
    }
  return (
     <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Bienvenue, {auth?.pseudo} !</p>
            </div>

            {/* Cartes de statistiques */}

            <div className="stats-grid">

                 <Link to="games" className="stat-card-link">
                    <div className="stat-card card-blue">
                        <div className="card-icon"><i className="fa-solid fa-gamepad"></i></div>
                        <div className="card-content">
                            <h3>Accès aux Jeux</h3>
                        </div>
                    </div>
                </Link>
                
                <Link to="users" className='stat-card-link'>
                   <div className="stat-card card-green">
                    <div className="card-icon"><i className="fa-solid fa-users"></i></div>
                    <div className="card-content">
                        <h3>Accès aux Utilisateurs</h3>
                    </div>
                   </div>
               </Link>
               <Link to="console" className='stat-card-link'>
                 <div className="stat-card card-orange">
                    <div className="card-icon"><i className="fa-solid fa-ghost"></i></div>
                    <div className="card-content">
                        <h3>Accès aux Consoles</h3>
                    </div>
                 </div>
               </Link>
                


                <Link to="/dashboard/emulators" className="stat-card-link">
                 <div className="stat-card card-red">
                    <div className="card-icon"><i className="fa-solid fa-box"></i></div>
                    <div className="card-content">
                        <h3>Accès aux Emulateurs</h3>
                    </div>
                 </div>
                </Link>
            </div>

            {/* Panneaux d'activité récente */}
            <div className="dashboard-panels">
                <div className="panel">
                    <div className="panel-header">
                        <h3>Jeux Récemment Ajoutés</h3>
                    </div>
                    <div className="panel-body">
                        <ul>
                            {recentGames.map(game => (
                                <li key={game._id}>
                                    <span className="game-title">{game.titre}</span>
                                    <span className="game-brand">{game.brand}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-header">
                        <h3>Activité Récente</h3>
                    </div>
                    <div className="panel-body">
                        <p>D'autres informations apparaîtront ici bientôt...</p>
                    </div>
                </div>
            </div>

             <div className="datetime-display">
                <p>{currentTime.toLocaleDateString()}</p>
                <p>{currentTime.toLocaleTimeString()}</p>
            </div>
        </div>
  )
}

export default Dashboard
