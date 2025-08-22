import React from 'react'
import './css/footer.css'
import { Link } from 'react-router'

const Footer = () => {
  return (
      <footer className='footer'> 
       <section>
             <div >
                  <ul className='r-flex'>
                     <li><Link to='/mentions-legales' className='mention'>Mention legale</Link></li>
                     <li>FAQ</li>
                     <li> Contact</li>
                     <li>Cookies</li>
                  </ul>
             </div>
       </section> 
       <p className='text'>«"Si mes précédentes aventures m'ont bien appris  quelques chose c'est que les truc les plus bizarres sont parfois  utile... Même les vers de tequila."»</p>
       <legend className='text'>Les Chevaliers de Baphomet : Les Boucliers de Quetzalcoatl</legend>
       <p className='text'>@ Tous droit réserver</p>
    </footer>
  )
}

export default Footer