import React from 'react'
import './css/Login.css'
import { Link } from 'react-router'
const Login = () => {
  const verification = (event) =>
    {
        let pass2 = document.getElementById("pass")
        let pseudo = document.getElementById("pseudo")
        let email = document.getElementById("mail")
        if(pass2.value && pseudo.value && email.value){
          if(pass2.value.length < 8)
           {
            alert("le mot de passe doit etre  égale ou superieur à 8!")
            event.preventDefault()
           }
          else
          {
            alert("bien jouée!")
            event.preventDefault()
          }
        }
        else
        {
          alert("formulaire incomplet")
          event.preventDefault()
        } 
    }
  return (
    <div>
       <h1 className='h1'>Login</h1>
       <form onSubmit={verification} id='form' className='form'>
         <label>Pseudo : </label>
         <input type="text" id='pseudo'  placeholder='player1'/> <br /> <br />
         <label>Password:</label>
         <input type="password" id='pass' placeholder='azerty' /> <br /> <br />
         <label >Email:</label>
         <input type="email" name="" id="mail" placeholder='email' /> <br /> <br />
         <button type="submit">Valider</button>
       </form>
       <p>Retour a la page d'acceuil <Link className='link' to='/'>acceuil </Link></p>
    </div>
  )
}

export default Login
