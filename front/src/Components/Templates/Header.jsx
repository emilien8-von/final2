import React, { useContext, useState,useEffect } from 'react'
import { Link } from 'react-router'
import './css/header.css'
import { Context } from '../../utils/context/Context'

const Header = () => {
  const {auth,logout} = useContext(Context)
        const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
  const menu = () =>{
    let list = document.getElementById("ul")
    let icon = document.getElementById("icon")
    icon.getAttribute("i")
    if(list.style.display === "none")
     {
     list.style.display = "block"
     icon.setAttribute("i","")
    } else {
     list.style.display = "none"
    }
  }
  return (
          <header className='header'>
        <div className='nav-container'>
            
            <div className="nav-left">
                <Link to="/">
                    <img className='logo' src="/manette2.png" alt="Logo" />
                </Link>
            </div>

            <ul id='ul' className={`nav-center ${isMenuOpen ? 'is-open' : ''}`}>

                <li><Link to='/' className='li'>Accueil</Link></li>
                <li><Link to='/list-game' className='li'>Jeux</Link></li>
                <li><Link to='/list-console'  className='li'>Console</Link></li>
                <li><Link to='/list-emulateur' className='li'>Emulateur</Link></li>
                {auth && (
                    <>
                        <li><Link to='/parametre' className='li'>Paramètres</Link></li>
                        {auth.role === 'admin' && (
                            <li><Link to='/dashboard' className='li'>Dashboard</Link></li>
                        )}
                    </>
                )}
                
            </ul>

            {/* GROUPE 3 : DROITE */}
            <div className='nav-right'>
                {auth ? (
                    <>
                        <button onClick={logout} className='but3'>Déconnexion</button>
                        <Link to="/parametre">
                            <img src={auth.avatar} alt="Profil" className="header-avatar" referrerPolicy="no-referrer" />
                        </Link>
                    </>
                ) : (
                    <>
                        <button className='but1'><Link to='/formulaire' className='but2'>Inscription</Link></button>
                        <button className='but1'><Link to='/login' className='but2'>Connexion</Link></button>
                    </>
                )}
                <div onClick={toggleMenu} className='menu'>
                    <i id='icon' className="fa-solid fa-bars"></i>
                </div>
            </div>

        </div>
        {/* La barre de recherche peut être placée ici si elle doit être en dessous */}
        {/* <input id='input' type="text" placeholder='Rechercher un jeux...' /> */}
          </header>
    
  )
}

export default Header