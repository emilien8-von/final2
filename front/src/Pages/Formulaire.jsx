import axios from 'axios'
import './css/Formulaire.css'
import { Link, useNavigate } from 'react-router'
import URLS from '../utils/constants/Api'
//import { REGISITER } from '../utils/configs/Form'
//import erreur from '../../../back/middlewares/erreur'
import React, { useState } from 'react'

const Formulaire = () => {
    const [inscrit , setInscrit] = useState({
      pseudo : "",
      password : "",
      email : ""
    })
    const navigate = useNavigate()
    const handleChange = event =>{
       const {name,value} = event.target
       setInscrit(prevUser => ({...prevUser,[name]:value}))
    }
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
    const verification = async event =>
    {
      event.preventDefault()
        const pass2 = document.getElementById("passw")
        const  pseudo = document.getElementById("pseudo")
        const email = document.getElementById("mail")
        if(pass2.value && pseudo.value && email.value){
         try{ 
           if(pass2.value.length < 3)
            {
             alert("votre mot de passe doit être superieur où égale à 3")
             console.log(error.message);
             
             event.preventDefault()
           }
           else 
             {
              console.log(pseudo);
              console.log(pass2);
              console.log(email);
              
               await axios.post(`http://localhost:8000/game/user/add`,inscrit)
               alert("Votre inscripion a bien été prise en compte un mail vous sera envoyés")
               navigate(`/`)
             }
            }
            catch(error){
            console.log(error.message);
            
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
       <h1 className='titre'>Rejoint Nous ! </h1>
      <form onChange={handleChange} onSubmit={verification} id='form' className='form' method='post' >
        <div className='pseudonyme'>
          <label htmlFor="pseudo">Pseudo:</label>
           <span> <img src="/player.svg" alt="play" className='player' /></span>
          <input type="text" name="pseudo" id="pseudo" className='pseudo' placeholder='pseudo' /> 
          
        </div> <br />
        <div className='password'>
          <label htmlFor="password">Password:</label>
          <input type="password" className='passw' name="password" id='passw' placeholder='*azerty*1'/>   
           <span> <img onClick={pass} src="/eye.svg" alt="eye" id='img' className='eye'/></span>
           <span> <img src="/lock.svg" alt="lock" className='cadenat' /></span>
         
        </div> <br />
        <div className='adresse'>
          <label htmlFor="email">Email</label>
          <input type="email" className='email' name='email' id='mail' placeholder='joueur1@gmail.com' /> 
             <span> <img src="/letter.svg" alt="mail" className='letter' /></span>
       
        </div>

         <button  className='valide'>Valider</button>
      </form>
      <div className='retour'> 
        <p> Retourner à la page d'<Link className='link' to='/'>acceuil</Link> ?</p>
        <p>Tu possède déja  un compte  alors <strong> <Link className='link' to = '/login'> clique sur ici </Link></strong></p>
      </div>
       
    </div>
  )
}

export default Formulaire