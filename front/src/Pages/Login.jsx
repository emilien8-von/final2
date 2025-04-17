import React, { useState , useContext} from 'react'
import './css/Login.css'
import { Link } from 'react-router'
import { LOGIN } from '../utils/configs/Form'
import { Context } from '../utils/context/Context'
const Login = () => {
     const [sign,setSign] = useState({})
     const {login} = useContext(Context)
     const handleChange = event =>{
      const {name,value} = event.target
      setSign(prevUser => ({...prevUser,[name]:value}))
   }
   const pass = () =>
    {
     const img = document.getElementById("img")
     const change =  document.getElementById("pass")
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
      event.preventDefault()
      login(sign)
      
    }
  return (
    <div className='color'>
       <h1>Login</h1>
      <section>
          <div className='f-flex'>
           <img src="/cosmos.png" className='img' alt="cosmo"/>
           <p> Connecte toi pour ta nouvelle adventure!</p>
          </div>
         <form onSubmit={verification} id='form' className='form'>
                {LOGIN.map(field =>(
                          <div key={field.id}>
                
                            <strong> <label htmlFor={field.id}>{field.label}</label> </strong> <br/>
                            <input type={field.type} name={field.name} className={field.className} id = {field.id} placeholder={field.placeholder}
                             onChange={handleChange} 
                            />
                          </div>
                        ))}
                           <span> <img onClick={pass} src="/eye.svg" alt="eye" id='img' className='img'/></span>
                <button className='button'>Valider</button>
         </form>

        <p>Retour a la page d'acceuil <Link className='link' to='/'>acceuil </Link></p>
        <div className='line'></div>
        <p>En vous connectant vous acceptez nos Termes et nos Conditions. </p>
      </section>
    </div>
  )
}

export default Login
