// Dans front/src/utils/services/instance.js
import axios from "axios";

// LA CORRECTION : On utilise le bon nom de variable d'environnement
const API_URL = import.meta.env.VITE_API_URL;

const INSTANCE = axios.create({
    baseURL: API_URL, 
    withCredentials: true,
    headers: {
        'Content-Type': "application/json"
    }
});

export default INSTANCE;