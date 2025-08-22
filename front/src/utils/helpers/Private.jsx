import { Navigate, Outlet } from "react-router"; // Assurez-vous d'importer depuis react-router-dom
import { useContext } from "react"; // On va utiliser le contexte pour une vérification plus fiable
import { Context } from "../context/Context";
import React from "react";
const Private = () => {
    // C'est mieux de se baser sur l'état du Contexte plutôt que le localStorage seul
    const { auth } = useContext(Context);

    // Si "auth" existe (n'est pas null), on affiche la page demandée (Outlet).
    // Sinon, on redirige l'utilisateur vers la page de connexion.
    return auth ? <Outlet /> : <Navigate to='/login' />;
};

export default Private;