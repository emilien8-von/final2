import React from 'react'
import './css/Formulaire.css'
import { Link } from 'react-router'
const Formulaire = () => {
    const pass = () =>
      {
       const img = document.getElementById("img")
       const change =  document.getElementById("passw")
       if(change.type === "password"){
        change.type = "text"
        img.setAttribute("src","/closed-eye.svg")
       } else{
        change.type = "password"
        img.setAttribute("src","/eye.svg")
       }
    }
    const verification = (event) =>
    {
        let pass2 = document.getElementById("passw")
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
    <div className='back'> 
       <h1>Rejoin Nous ! </h1>
      <form onSubmit={verification}  id='form' className='form' method='post' >
        <label htmlFor="Pseudo">Pseudo:</label>
        <input type="text" placeholder='player1' name="pseudo" id="pseudo" /> <br />
        <div className='p-flex'> 
          <label htmlFor="Password">Password:</label>
          <input type="password" name="password" className='passw' id="passw" placeholder='player1' /> 
          <span> <img onClick={pass} src="/eye.svg" alt="eye" id='img' className='img'/></span>
        </div>
        <br />
        <p> <strong> Nous vous conseillons  de metttre  au moins 1 majuscule, 1 caractere spéciale et éviter les mot de pass simple (ex : Azerty*1)</strong></p>
         <label htmlFor="Email">Email:</label>
         <input type="email" name="email" id="mail" placeholder='player1@gmail.com'/>
          <br />
         <button  className='valider'>Valider</button>
      </form>
      <p> Retour à la page d'<Link className='link' to='/'>acceuil</Link> ?</p>
    </div>
  )
}

export default Formulaire
