import React, { useState } from 'react'
import axios from 'axios'
import './css/Formulaire.css'
import { Link, useNavigate } from 'react-router'
import URLS from '../utils/constants/Api'
import { REGISITER } from '../utils/configs/Form'
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
        let pass2 = document.getElementById("passw")
        let pseudo = document.getElementById("pseudo")
        let email = document.getElementById("mail")
        if(pass2.value && pseudo.value && email.value){
           
           try{
            await axios.post(`http://localhost:8000/game/user/add`,inscrit)
            alert("Votre inscripion a bien été prise en compte un mail vous sera envoyés")
            navigate(`/`)
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
       <h1>Rejoin Nous ! </h1>
      <form onSubmit={verification}  id='form' className='form' method='post' >
        
        {REGISITER.map(field =>(
          <div key={field.id}>

            <label htmlFor={field.id}>{field.label}</label>
            <input type={field.type} name={field.name} className={field.className} id = {field.id} placeholder={field.placeholder}
             onChange={handleChange} 
            />
          </div>
        ))}
           <span> <img onClick={pass} src="/eye.svg" alt="eye" id='img' className='img'/></span>
         <button  className='valider'>Valider</button>
      </form>
      <p> Retour à la page d'<Link className='link' to='/'>acceuil</Link> ?</p>
      <p>Tu possède déja  un compte  alors <strong> <Link className='link' to = '/login'> clique sur ici </Link></strong></p>
    </div>
  )
}

export default Formulaire
