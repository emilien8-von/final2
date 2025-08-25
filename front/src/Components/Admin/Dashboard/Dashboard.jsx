import React from 'react'
import './css/Dashboard.scss'
import { useState ,useContext,useEffect} from 'react';
import { Context } from '../../../utils/context/Context';
import URLS from '../../../utils/constants/URLS.js';
import INSTANCE from '../../../utils/services/instance';
const Dashboard = () => {
     const { auth } = useContext(Context);
    const [stats, setStats] = useState({ games: 12, users: 0, consoles: 0 ,emulateurs: 0});
    const [recentGames, setRecentGames] = useState([]);
    const [loading, setLoading] = useState(true);
     const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // On utilise Promise.all pour lancer les requêtes en parallèle
                const [statsResponse, recentGamesResponse] = await Promise.all([
                   INSTANCE.get(URLS.GET_USER_STATS),
                   INSTANCE.get(URLS.GET_RECENT_GAMES)
            ]);
                
                setStats(statsResponse.data);
                setRecentGames(recentGamesResponse.data);

            } catch (error) {
                console.error("Erreur lors de la récupération des données du dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);
     useEffect(() => {
        // On démarre l'intervalle
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000)

    setInterval(Time,1000)
    return () => {
            clearInterval(timerId);
        };
    }, [])

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
                <div className="stat-card card-blue">
                    <div className="card-icon"><i className="fa-solid fa-gamepad"></i></div>
                    <div className="card-content">
                        <h3>Total des Jeux</h3>
                        <span>{stats.games}</span>
                    </div>
                </div>
                <div className="stat-card card-green">
                    <div className="card-icon"><i className="fa-solid fa-users"></i></div>
                    <div className="card-content">
                        <h3>Total des Utilisateurs</h3>
                        <span>{stats.users}</span>
                    </div>
                </div>
                <div className="stat-card card-orange">
                    <div className="card-icon"><i className="fa-solid fa-ghost"></i></div>
                    <div className="card-content">
                        <h3>Total des Consoles</h3>
                        <span>{stats.consoles}</span>
                    </div>
                </div>
                <div className="stat-card card-red">
                    <div className="card-icon"><i className="fa-solid fa-box"></i></div>
                    <div className="card-content">
                        <h3>Total des Emulateur</h3>
                        <span>{stats.emulateurs}</span>
                    </div>
                </div>
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
