// Dans front/src/utils/services/instance.js
import axios from "axios";

// LA CORRECTION N°1 : On lit la variable d'environnement
// En local, Vite prendra la valeur de .env.local
// Sur Vercel, Vite prendra la valeur que vous avez configurée dans les settings
const INSTANCE_URL = import.meta.env.VITE_INSTANCE_URL;
const INSTANCE = axios.create({
    // LA CORRECTION N°2 : On corrige la faute de frappe "baseUrl" -> "baseURL"
    baseURL: INSTANCE_URL, 
    withCredentials: true,
    headers: {
        'Content-Type': "application/json"
    }
});

export default INSTANCE;