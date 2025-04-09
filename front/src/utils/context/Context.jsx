import React,{createContext, useEffect, useState} from "react";
import URLS from "../constants/Api";

import INSTANCE from "../services/instance";

export const Context = createContext()
export const Provider = ({children}) =>{
    const [auth,setAuth] = useState(null)
    const [loading, setLoading] = useState(false)
    const login = async(dbuser) => {
    
        try{
            setLoading(true)
           const {data,status} = await INSTANCE.post(URLS.POST_LOGIN, dbuser)
           if(status === 200){
             setAuth(data)
             localStorage.setItem('auth', JSON.stringify(auth))
             setLoading(false)
           }
           
           
        }
        catch(error){
            console.log(error.message);
            setLoading(false)
        }
    }
    const logout = () =>{
        setAuth(null) //Réinitialise l'etat de l'user à null
        localStorage.removeItem('auth') // suprimer les infos
    }
    return(
       
        <Context.Provider value={{login ,logout, auth,loading}}>
            {children}
        </Context.Provider>
    )
}