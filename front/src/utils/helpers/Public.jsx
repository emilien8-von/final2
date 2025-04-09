import { Navigate,Outlet } from "react-router";

const Public = () =>{
    const auth = localStorage.get('auth')
    return auth ?  <Navigate to='/'/> : <Outlet/> 
}

export default Public