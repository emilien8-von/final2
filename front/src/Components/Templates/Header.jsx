import React, { useContext, useState } from 'react'
import { Link } from 'react-router'
import './css/header.css'
import { Context } from '../../utils/context/Context'

const Header = () => {
  const {auth,logout} = useContext(Context)
        const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
        
          </header>
    
  )
}

export default Header