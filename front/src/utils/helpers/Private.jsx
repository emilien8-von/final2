import { Navigate, Outlet } from "react-router"; 
import { useContext } from "react"; 
import { Context } from "../context/Context";
import React from "react";
const Private = () => {
    const { auth } = useContext(Context);

   
    return auth ? <Outlet /> : <Navigate to='/login' />;
};

export default Private;