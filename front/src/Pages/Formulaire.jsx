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
       const change =  document.getElementById("passwi")
    
       if(change.type === "password"){
        change.type = "text"
        img.setAttribute("src","/closed-eye.svg")
       } else{
        change.type = "password"
        img.setAttribute("src","/eye.svg")
       }
       
    }
   
    const check = ()=> {
      const cross2 = document.querySelector(".crossx")
      const cross3 = document
      const pass = document.getElementById("passwi")

      if(pass.value.length >= 3){
        cross2.setAttribute("src","/valide.png")
        
       }
       else{
        cross2.setAttribute("src","/croosing.svg")
       }
          console.log(pass.value);
       const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
       if(pass.matches(regex)) {
          cross3.setAttribute("src","/valide.png")
       }
       else{
        cross3.setAttribute("src","/croosing.svg")
       }
      
    }
    const verification = async event =>
    {
      event.preventDefault()
        const cross2 = document.querySelector(".cross")
        const pass2 = document.getElementById("passwi")
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
       
           <span> <img src="/player.svg" alt="play" className='player' /></span>
          <input type="text" name="pseudo" id="pseudo" className='pseudo' placeholder='write your pseudo' /> 
          
        </div> <br />

        <div className='adresse'>
         
          <input type="email" className='mail' name='email' id='mail' placeholder='email adress (ex :joueur1@gmail.com)' /> 
             <span> <img src="/letter.svg" alt="mail" className='letter' /></span>
       
        </div> <br />

         <div className='password'>
         
          <input onInput={check}type="password" className='passwi' name="password" id='passwi' placeholder='password (ex :*azerty*1)'/>   
           <span> <img onClick={pass}  src="/eye.svg" alt="eye" id='img' className='eye'/></span>
           <span> <img src="/lock.svg" alt="lock" className='cadenat' /></span> <br />

           
        </div> 
                     
           <p className='pm'>Le mot de passe doit avoir au moyen une majuscule <img className='cross' src="./croosing.svg" alt="cross"  /></p>
           <p className='p2'>Le mot de passe doit avoir au moins 1 caractères spécial  <img className='cross' src="./croosing.svg" /> </p>
           <p className='p3'>Le mot de passe doit avoir au moins un chiffre  <img className='cross' src="./croosing.svg" /></p>
           <p className='p4'>Le mot de passe doit avoir au moins 3 caractères  <img   className='crossx' src="./croosing.svg" /></p>
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