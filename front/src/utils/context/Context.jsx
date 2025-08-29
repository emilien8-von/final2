import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router"; 
import URLS from "../constants/URLS";
import INSTANCE from "../services/instance";
export const Context = createContext();

export const Provider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true); // Mettez loading à true au début
    const navigate = useNavigate();

    useEffect(() => {
        const logged = () => {
            try {
                const user = localStorage.getItem("auth");
                const userparsed = user ? JSON.parse(user) : null;
                
                setAuth(userparsed); 
            } catch (error) {
                setAuth(null);
            } finally {
            
                setLoading(false);
            }
        };
        
        logged();
    }, []); 
    const login = async (dbuser) => {
        try {
            setLoading(true);
            const { data, status } = await INSTANCE.post(URLS.POST_LOGIN, dbuser);
            
            if (status === 200) {
                localStorage.setItem('auth', JSON.stringify(data)); 
                
                setAuth(data); 
                
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