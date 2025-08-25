import axios from 'axios';

// On récupère l'URL de base depuis les variables d'environnement
const baseURL = import.meta.env.VITE_API_URL;

// On crée une instance d'axios avec la configuration de base
const API = axios.create({
    baseURL: baseURL,
    withCredentials: true // On applique cette option à TOUTES les requêtes
});

export default API;