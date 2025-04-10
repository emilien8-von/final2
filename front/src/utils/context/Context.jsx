import React,{createContext, useEffect, useState} from "react";
import URLS from "../constants/Api";
import { useNavigate } from "react-router";
import axios from "axios"

export const Context = createContext()
export const Provider = ({children}) =>{
    const [auth,setAuth] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    useEffect(() =>{
        logged()
    },[])
    const login = async(dbuser) => {
    
        try{
            setLoading(true)
           const {data,status} = await axios.post(`http://localhost:8000/game/user/login`, dbuser)
           if(status === 200){
             setAuth(data)
             localStorage.setItem('auth', JSON.stringify(auth))
             navigate(`/`) // Redirige vers la page d'acceuil
             setLoading(false)
           }
           
           
        }
        catch(error){
            console.log(error.message);
            setLoading(false)
        }
    }
    const logout = () =>{
        setLoading(true)
        setAuth(null) //Réinitialise l'etat de l'user à null
        localStorage.removeItem('auth') // suprimer les infos

        navigate(`/`)
        setLoading(false)
    }
    const logged =()=>{
        setLoading(true)
        // Recupère le valeur
        const user = localStorage.getItem("auth")
        const userparsed = user ? JSON.parse(user) : null
        setAuth(false)
    }
    return(
       
        <Context.Provider value={{login ,logout, auth,loading}}>
            {children}
        </Context.Provider>
    )
}