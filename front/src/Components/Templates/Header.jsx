import React, { useContext } from 'react'
import { Link } from 'react-router'
import { HEADER_LINKS } from '../../utils/configs/Links'
import { Context } from '../../utils/context/Context'
const Header = () => {
  const {auth,logout} = useContext(Context)

  
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
            <section >
              <nav>
                <div className='c-flex'>
                   <img src="/manette2.png" alt="imj" width={80}/>
                 <ul id='ul' className=' ul'>
                 <div className=' d-flex'> 
                      <li><Link className='li'>Concept</Link></li>
                      <li><Link className='li' >Jeux</Link></li>
                      <li><Link className='li' >Console</Link></li>
                    </div>
                 </ul>
                    <button className='but1'><Link to='/formulaire' className='but2'>Inscription</Link></button>
                    { !auth?
                    <button className='but1'><Link to='/login' className='but2'>Connexion</Link></button>
                    :
                    <button onClick={logout} className='but1'><Link to='/login' className='but2'>Déconnexion</Link></button>}
                    <div onClick={menu} className='menu'><i id='icon' class="fa-solid fa-bars"></i> </div>
                </div>
                <input id='input' type="text" placeholder='Rechercher un jeux:' />
              </nav>
            </section>
        </header>
    
  )
}

export default Header