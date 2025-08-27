import React from 'react'
import { NavLink } from 'react-router'
import './css/side.scss';

const Side = () => {
  return (
    
        <div className="sidebar">
        <div className="sidebar-header">
            <h3>Alpha Gaming</h3>
        </div>
        <ul className="sidebar-menu">
            <li>
                <NavLink to="/dashboard" end>
                    <i className="fa-solid fa-house"></i>
                    <span>Accueil</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="games">
                    <i className="fa-solid fa-gamepad"></i>
                    <span>Gérer les Jeux</span>
                </NavLink>
            </li>
             <li>
                <NavLink to="users">
                    <i className="fa-solid fa-users"></i>
                    <span>Gérer les Jeux</span>
                </NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Side
