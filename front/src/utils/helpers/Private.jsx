import { Navigate,Outlet } from "react-router";

const Private = () =>{
    const auth = localStorage.get('auth')
    return auth ? <Outlet/> : <Navigate to='/login'/>
}

export default Private
