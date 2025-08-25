import React, { createContext, useEffect, useState } from "react";
// import URLS from "../constants/INSTANCE"; // Assurez-vous que ce chemin est correct si vous l'utilisez
import { useNavigate } from "react-router"; 
import URLS from "../constants/URLS.js";
import INSTANCE from "../services/instance";
export const Context = createContext();

export const Provider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true); // Mettez loading à true au début
    const navigate = useNavigate();

    // Cette fonction s'exécute une seule fois au montage du Provider
    useEffect(() => {
        const logged = () => {
            try {
                // Récupère la valeur du localStorage
                const user = localStorage.getItem("auth");
                const userparsed = user ? JSON.parse(user) : null;
                
                // CORRECTION N°2 : On met à jour l'état avec l'utilisateur trouvé
                setAuth(userparsed); 
            } catch (error) {
                // En cas d'erreur de parsing, on s'assure que l'état est propre
                setAuth(null);
            } finally {
                // On a fini de vérifier, on arrête le chargement initial
                setLoading(false);
            }
        };
        
        logged();
    }, []); // Le tableau vide [] assure que cela ne s'exécute qu'une fois

    const login = async (dbuser) => {
        try {
            setLoading(true);
            const { data, status } = await INSTANCE.post(URLS.POST_LOGIN, dbuser);
            
            if (status === 200) {
                // CORRECTION N°1 : On utilise "data" directement
                localStorage.setItem('auth', JSON.stringify(data)); 
                
                // On met à jour l'état
                setAuth(data); 
                
                // La navigation se fera après la mise à jour
                navigate(`/`); 
            }
        } catch (error) {
            alert("Le mot de passe ou l'email est incorrect !");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
    
        setLoading(true);
        setAuth(null);
        localStorage.removeItem('auth');
        navigate(`/`);
        setLoading(false);
    };

    return (
        <Context.Provider value={{ login, logout, auth, loading, setAuth }}>
        {!loading && children}
    </Context.Provider>
    );
};