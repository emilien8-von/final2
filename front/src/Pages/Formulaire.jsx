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
    const [password, setPassword] = useState('');

 
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
      const cross2 = document.getElementById("crossx")
      const chiffre = document.getElementById('chiffre')
      const pass = document.getElementById("passwi")
      const maj = document.getElementById("maj")
      const carac = document.getElementById("carac")
      const password= pass.value      

      const aUneMajuscule = /[A-Z]/;
      const aUnCaractereSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        const aUnChiffre = /[0-9]/;
        if(aUneMajuscule.test(password)){
        maj.setAttribute("src","/valide.png")
        } else{
          maj.setAttribute("src","/croosing.svg")
        }
       
         if(aUnChiffre.test(password)){
              chiffre.setAttribute("src", "/valide.png");
        } else{
          chiffre.setAttribute("src","/croosing.svg")
        }

        if(aUnCaractereSpecial.test(password)){
        carac.setAttribute("src","/valide.png")
        } else{
              carac.setAttribute("src","/croosing.svg")
        }

      if(pass.value.length >= 3){
        cross2.setAttribute("src","/valide.png")
       }
       else{
        cross2.setAttribute("src","/croosing.svg")
       }
       
       
      
      
    }
    const verification = async event =>
    {
      event.preventDefault()
         
         const pass2 = document.getElementById("passwi")
         const password= pass2.value     
         const aUneMajuscule = /[A-Z]/;
         const aUnCaractereSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
         const aUnChiffre = /[0-9]/;
        
        const  pseudo = document.getElementById("pseudo")
        const pvalue = pseudo.value
        
        const email = document.getElementById("mail")
        
        if(password && pvalue && email.value){
         try{ 
           if(password.length < 3)
            {
             alert("votre mot de passe doit être superieur où égale à 3")
             console.log(error.message);
             
             event.preventDefault()
           }
           else if(!aUneMajuscule.test(password))
             {
               alert("Votre mot de passe doit avoir une majuscule!")
               event.preventDefault()
             } else if(!aUnCaractereSpecial.test(password)){
                 alert("Votre mot de passe doit avoir un caractère spéciale!")
               event.preventDefault()
             }
              else if (!aUnChiffre.test(password)){
                   alert("Votre mot de passe doit avoir un chiffre!")
               event.preventDefault()
              }
              else{ 
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

        <div className="input-wrapper">
  <img src="/player.svg" alt="player icon" className="input-icon" />
  <input type="text" id='pseudo' name="pseudo" placeholder="Ton pseudo*(ex: joueur1)" /> 
</div>

        <div className="input-wrapper">
          <img src="/letter.svg" alt="mail icon" className="input-icon" />
          <input type="email" id='mail' name="email" placeholder=" Adress mail (ex: joueur1@gmail.com)" /> 
        </div>
         <div className="input-wrapper">
           <img src="/lock.svg" alt="lock icon" className="input-icon" />
           <input onInput={check} type="password" id="passwi" placeholder="Ton mot de passe (ex: *azerty*1)" />   
           <img onClick={pass} src="/eye.svg" alt="eye icon" id="img" className="input-icon eye-icon" />
         </div>
                     
           <p className='pm'>Le mot de passe doit avoir au moins une majuscule <img id="maj" className='maj' src= "/croosing.svg" alt="cross"  /></p>
           <p className='p2'>Le mot de passe doit avoir au moins 1 caractères spécial  <img id='carac' className='carac' src=  "/croosing.svg"/> </p>
           <p className='p3'>Le mot de passe doit avoir au moins un chiffre  <img id="chiffre" className='chiffre' src=  "/croosing.svg"  /></p>
           <p className='p4'>Le mot de passe doit avoir au moins 3 caractères  <img id='crossx'  className='crossx' src="./croosing.svg" /></p>
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